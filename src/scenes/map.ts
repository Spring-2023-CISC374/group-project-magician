import Phaser from 'phaser'
export default class map extends Phaser.Scene {
	private player?: Phaser.Physics.Arcade.Sprite
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	constructor() {
		super('map')
	}

	preload() {
		this.load.image('overworld', 'assets/background/overworldResize.png')
		this.load.spritesheet('mainChar', 'assets/hooded_sprite_16x28_no_background.png',
		{frameWidth: 16, frameHeight:28})
	}

	create() {		
		this.add.image(400, 300, 'overworld');
		this.makeCharacter();
		this.cursors = this.input.keyboard.createCursorKeys() //Allows keys to work

        this.add.text(0, 40, 'currently on Map \n Click for Level 1', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('map')
            this.scene.start('level_1')
		})
	}
	
	update() {
		this.handleMoving();
	}

	private makeCharacter() {
		this.player = this.physics.add.sprite(80,510,'mainChar')
		this.player.setScale(2);
		this.player.setCollideWorldBounds(true)
	}

	private handleMoving() {
		if (!this.cursors) {
			return
		}
		if (this.cursors.left?.isDown) {
			this.player?.setVelocityX(-160)
		}
		else if(this.cursors.right?.isDown){
			this.player?.setVelocityX(160)
		}
		else if(this.cursors.down?.isDown){
			this.player?.setVelocityY(160)
		}
		else if(this.cursors.up?.isDown){
			this.player?.setVelocityY(-160)
		}
		else {
			this.player?.setVelocityX(0)
			this.player?.setVelocityY(0)
		}
	}

}