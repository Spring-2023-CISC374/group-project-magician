import Phaser from 'phaser'
export default class combat_1 extends Phaser.Scene {
	private player?: Phaser.Physics.Arcade.Sprite
	private enemy?: Phaser.Physics.Arcade.Sprite
	private spell?: Phaser.Physics.Arcade.Sprite
	private keys?: Phaser.Types.Input.Keyboard.CursorKeys;

	constructor() { super('combat_1') }

	preload() {
		this.load.spritesheet('enemyDragon', 'assets/enemyDragon.png',
		{frameWidth: 100, frameHeight: 100})
		this.load.spritesheet('darkSpell', 'assets/darkSpell.png',
		{frameWidth: 40, frameHeight: 32})
	}

	create() {		
		this.player = this.makeCharacter();
		this.setCharPosition();
		this.enemy = this.makeEnemy()
		this.spell = this.makeSpell(this.player)
		this.keys = this.input.keyboard.createCursorKeys();
        this.add.text(0, 40, 'Currently in Combat \nClick for inventory \n\nPress Space to attack ', {
			fontSize: '32px',
			color: '#ffffff'
		})
        this.input.on('pointerup', () => {
            this.scene.stop('combat_1')
            this.scene.start('inventory')
		})
		// collision between spell and enemy
		this.physics.add.overlap(this.enemy, this.spell, this.handleSpellCollision, undefined, this)
	}
	

	update() {
		if (this.keys?.space.isDown) { 
			this.castSpell() 
		}
		if (this.spell?.visible == true) {
			this.spell.setX(this.spell.x + 1)
		}
	}

	private makeEnemy() {
		this.enemy = this.physics.add.sprite(400, 300, 'enemyDragon')
		this.enemy.setCollideWorldBounds(true)
		return this.enemy
	}
	private setCharPosition() {
		this.player?.setPosition(200,300)
	}
	private makeCharacter() {
		this.player = this.physics.add.sprite(80, 510, 'mainChar')
		this.player
			.setScale(2)
			.setCollideWorldBounds(true)
		return this.player
	}
	private makeSpell(player: Phaser.GameObjects.Sprite) {
		this.spell = this.physics.add.sprite(player.x + 30, player.y, 'darkSpell')
		this.spell
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
		this.spell?.setVisible(true)
		this.spell?.anims.play('dark_spell', true)
		this.spell?.setX(this.spell.x + 1)
	}
	private handleSpellCollision(enemy: Phaser.GameObjects.GameObject, spell: Phaser.GameObjects.GameObject) {
		(spell as Phaser.Physics.Arcade.Image).disableBody(true, true);
		(enemy as Phaser.Physics.Arcade.Image).setTint(0xff0000);




	}
}