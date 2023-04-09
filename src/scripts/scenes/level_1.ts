import Phaser from 'phaser'
import CommonLevel from './CommonLevel'
import MainCharacter from '../objects/MainCharacter'

export default class level_1 extends CommonLevel {
	private player?: MainCharacter
	private currentHealth: number
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

	constructor() {
		super('level_1')
	}
	init (data: any) {
		console.log('init', data)
		this.currentHealth = data.storedHealth
	}
	preload() {
		
		this.load.image('ground', 'assets/background/simpleGround.png')
	}

	create() {		
		this.add.image(400, 300, 'ground').setScale(3.5);
		super.createInformation()
		super.createButtons(this.scene.scene)

		const enemy = this.physics.add.sprite(300, 485, 'dragon');
		this.player = new MainCharacter(this, 80, 480,this.currentHealth)
		this.player.displayHealth()
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