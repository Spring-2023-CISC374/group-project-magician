import Phaser from 'phaser'
import MainCharacter from "../objects/MainCharacter"

export default class map extends Phaser.Scene {
	private player?: MainCharacter
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	private level_1_marker?: Phaser.Physics.Arcade.Sprite
	private home_marker?: Phaser.Physics.Arcade.Sprite
	constructor() {
		super('map')
	}

	preload() {
		this.load.image('overworld', 'assets/background/overworldResize.png')
		this.load.spritesheet('mainChar', 'assets/hooded_sprite_16x28_no_background.png',
		{frameWidth: 16, frameHeight:28})
		this.load.image('level_1_marker','assets/Icons/Pink_1.png')
		this.load.image('home_marker','assets/Icons/house.png')
	}

	create() {		
		this.add.image(400, 300, 'overworld');

		const level_1_marker = this.physics.add.image(400,400,'level_1_marker')
		const home_marker = this.physics.add.image(500,400,'home_marker')

		//level_1_marker.setScale(0.05)
		//home_marker.setScale(0.05)

		this.player = new MainCharacter(this, 80, 510)
		this.cursors = this.input.keyboard.createCursorKeys()
		
        this.add.text(0, 40, 'currently on Map \n Click for Level 1', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.player.handleMapCollision(this.player, level_1_marker, this.scene.key, 'level_1')
		this.player.handleMapCollision(this.player, home_marker, this.scene.key, 'home')
	}
	
	update() {
		//this.handleMoving();
		if (!this.player || !this.cursors) {
			return
		}
		this.player.handleMoving(this.player, this.cursors);
	}

	

}
