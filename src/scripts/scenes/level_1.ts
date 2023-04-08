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
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-level1')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))
		//this.add.image(400, 300, 'soil4').setScale(3.5);

        this.add.text(50, 40, 'Currently at level 1 \n Click pink 1 for combat_1 \n Click chest for inventory \n Click map icon for map', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.existing(new Click_Change_Scene(this, 50, 100, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('level_1')
		}));

        this.add.existing(new Click_Change_Scene(this, 50, 200, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory')
			this.scene.stop('level_1')
		}));

		const enemy = this.physics.add.sprite(300, 450, 'dragon');
		this.player = new MainCharacter(this, 80, 510)
		this.cursors = this.input.keyboard.createCursorKeys()

		this.player.handleEnemyCollision(this.player, enemy, 'level_1', 'combat_1') 			// enemy 
	}
	

	update() {
		//this.handleMoving();
		if (!this.player || !this.cursors) {
			return
		}
		this.player.handleMoving(this.player, this.cursors);
	}

}