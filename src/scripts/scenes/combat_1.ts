import Phaser from 'phaser'
export default class combat_1 extends Phaser.Scene {
	private player?: Phaser.Physics.Arcade.Sprite
	private enemy?: Phaser.Physics.Arcade.Sprite
	private spell?: Phaser.Physics.Arcade.Sprite
	private keys?: Phaser.Types.Input.Keyboard.CursorKeys;

	constructor() { super('combat_1') }

	preload() {
		// load spritesheets
		this.load.spritesheet('player', 'assets/player.png',
		{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('enemyDragon', 'assets/enemyDragon.png',
		{frameWidth: 100, frameHeight: 100})
		this.load.spritesheet('darkSpell', 'assets/darkSpell.png',
		{frameWidth: 40, frameHeight: 32})
	}

	create() {		
		// create assets
		this.player = this.makeCharacter();
		this.enemy = this.makeEnemy()
		this.spell = this.makeSpell(this.player)
		this.keys = this.input.keyboard.createCursorKeys();
		// scene text
        this.add.text(0, 40, 'Currently in Combat \nClick for inventory \n\nPress Space to attack ', {
			fontSize: '32px',
			color: '#ffffff'
		})
		// scene change
        this.input.on('pointerup', () => {
            this.scene.stop('combat_1')
            this.scene.start('inventory')
		})
		// player idle animation
		this.player.anims.play('idle', true)
		// add collisions
		this.physics.add.overlap(this.enemy, this.spell, this.handleSpell, undefined, this)
	}
	
	update() {
		// update spells
		if (this.keys?.space.isDown) { 
			this.castSpell() 
		}
		if (this.spell?.active == true) {
			this.spell.setX(this.spell.x + 1)
		}
	}

	private makeEnemy() {
		this.enemy = this.physics.add.sprite(400, 300, 'enemyDragon')
		this.enemy.setCollideWorldBounds(true)
		return this.enemy
	}

	private makeCharacter() {
		this.player = this.physics.add.sprite(80, 510, 'player')
		this.player
			.setScale(2)
			.setPosition(200, 300)
			.setCollideWorldBounds(true)
		this.anims.create({
				key: 'idle', 
				frames: this.anims.generateFrameNumbers('player', {
					start: 0, end: 1
				}), 
				frameRate: 5, repeat: -1
			})
		this.anims.create({
			key: 'cast', 
			frames: this.anims.generateFrameNumbers('player', {
				start: 65, end: 68
			}), 
			frameRate: 8
		})
		return this.player
	}

	private makeSpell(player: Phaser.GameObjects.Sprite) {
		this.spell = this.physics.add.sprite(player.x + 30, player.y, 'darkSpell')
		this.spell
			.setActive(false)
			.setVisible(false)
			.setCollideWorldBounds(true)
		this.anims.create({
				key: 'dark_spell', 
				frames: this.anims.generateFrameNumbers('darkSpell', {
					start: 0, end: 6
				}), 
				frameRate: 10, repeat: -1
			}) 		
		return this.spell
	}

	private castSpell() {
		this.player?.anims.play('cast', true)
			.once('animationcomplete', () => {
				this.spell?.setActive(true)
					.setVisible(true)
					.anims.play('dark_spell', true)
				this.player?.anims.play('idle', true)
			})
	}

	private handleSpell(enemy: Phaser.GameObjects.GameObject, spell: Phaser.GameObjects.GameObject) {
		(spell as Phaser.Physics.Arcade.Image).disableBody(true, true);
		(enemy as Phaser.Physics.Arcade.Image).setTint(0xff0000);
	}
}