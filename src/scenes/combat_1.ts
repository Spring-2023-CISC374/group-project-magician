import Phaser from 'phaser'
export default class combat_1 extends Phaser.Scene {
	private player?: Phaser.Physics.Arcade.Sprite
	constructor() {
		super('combat_1')
	}

	preload() {
		this.load.spritesheet('enemyDragon', 'assets/enemyDragon.png',
		{frameWidth: 100, frameHeight:100})
	}

	create() {		
		this.makeEnemy();
		this.makeCharacter();
		this.setCharPosition();
        this.add.text(0, 40, 'Currently in Combat \n Click for inventory', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('combat_1')
            this.scene.start('inventory')
		})
	}
	

	update() {
		//
	}

	private makeEnemy() {
		this.player = this.physics.add.sprite(400,300,'enemyDragon')
		this.player.setCollideWorldBounds(true)
	}
	private setCharPosition() {
		this.player?.setPosition(200,300)
	}
	private makeCharacter() {
		this.player = this.physics.add.sprite(80,510,'mainChar')
		this.player.setScale(2);
		this.player.setCollideWorldBounds(true)
	}
}