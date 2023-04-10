import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'
import MainCharacter from '../objects/MainCharacter'

export default class level_1 extends Phaser.Scene {

	private player?: MainCharacter
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

	constructor() {
		super('level_1')
	}
	preload() {
		// load background image
		this.load.image('background-level1', 'assets/background/night_forest.png');
		this.load.image('resource1', 'assets/Icons/resource_icon.png');
		
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-level1')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))
		//this.add.image(400, 300, 'soil4').setScale(3.5);

        this.add.text(10, 40, 'Currently at level 1 \n\nConfront the Enemy for Combat\nClick Chest for Inventory \nClick Map Icon for Map\nClick Resource to collect more gems', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.existing(new Click_Change_Scene(this, 750, 50, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('level_1')
		}));

        this.add.existing(new Click_Change_Scene(this, 750, 550, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory')
			this.scene.stop('level_1')
		}));

		this.add.existing(new Click_Change_Scene(this, 750, 100, 'resource1', () => {		// resource button
			this.scene.stop('level_1')
			this.scene.start('resource')
		}));

		const enemy = this.physics.add.sprite(300, 450, 'dragon');
		this.player = new MainCharacter(this, 80, 510)
		this.cursors = this.input.keyboard.createCursorKeys()

		this.player.handleEnemyCollision(this.player, enemy, 'level_1', 'combat_1') 			// enemy 
		
		this.createEmitter("petal"); 
	
	}
	
	private createEmitter(textureName: string)
	{
		const particles = this.add.particles(textureName)

        const emitter = particles.createEmitter({
            x: {min: 0, max: 1000},
			y: -5,
			lifespan: 7000,
			speedX: {min: -5, max: -100},
			tint: 0x14424C,
			speedY: {min: 25, max: 100},
			scale: {start: .75, end:.25},
			blendMode: 'ADD',
			rotate: { min: -180, max: 180 },
			quantity: .25
		})	

		return emitter
	}

	update() {
		//this.handleMoving();
		if (!this.player || !this.cursors) {
			return
		}
		this.player.handleMoving(this.player, this.cursors);
	}

}