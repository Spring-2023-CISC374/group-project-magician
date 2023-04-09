import Phaser from 'phaser'
import MainCharacter from "../objects/MainCharacter"

export default class map extends Phaser.Scene {
	private player?: MainCharacter
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	
	constructor() {
		super('map')
	}

	preload() {
		this.load.image('overworld', 'assets/background/overworldResize.png')
		this.load.image('home_marker','assets/Icons/house.png')
	}

	create() {		
		this.add.image(400, 300, 'overworld');

		const level_1_marker = this.physics.add.image(400,400,'level_1_marker')
		const home_marker = this.physics.add.image(500,400,'home_marker')

		this.player = new MainCharacter(this, 80, 510, 100)
		this.cursors = this.input.keyboard.createCursorKeys()

		this.player.handleMapCollision(this.player, level_1_marker, 'map', 'level_1')
		this.player.handleMapCollision(this.player, home_marker, 'map', 'home')
	}
	
	update() {
		//this.handleMoving(); 
		if (!this.player || !this.cursors) {
			return
		}
		this.player.handleMoving(this.player, this.cursors);
	}

	

}
