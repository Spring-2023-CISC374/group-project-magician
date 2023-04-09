import Phaser from 'phaser'
import MainCharacter from '../objects/MainCharacter';
export default class combat_1 extends Phaser.Scene {
	private player?: MainCharacter
	private enemy?: Phaser.Physics.Arcade.Sprite
	private spell?: Phaser.Physics.Arcade.Sprite
	private keys?: Phaser.Types.Input.Keyboard.CursorKeys;
	private currentHealth: number

	constructor() { super('combat_1') }

	init (data: any) {
		console.log('init', data)
		this.currentHealth = data.storedHealth
	}

	preload() {
		// load spritesheets
		this.load.spritesheet('player', 'assets/player.png',
		{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('dragon', 'assets/enemies/dragon.png',
		{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('darkSpell', 'assets/spells/darkSkull.png',
		{frameWidth: 40, frameHeight: 32})
		// load images
		this.load.image('bg', 'assets/background/dark_forest.png')
		this.load.image('run_away_icon', 'assets/Icons/run_away.png');
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'bg')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)		
		// create assets
		this.player = new MainCharacter(this, 80, 515, this.currentHealth)
		this.player.displayHealth()
		this.enemy = this.makeEnemy()
		this.spell = this.makeSpell(this.player)
		this.keys = this.input.keyboard.createCursorKeys();
		// scene text
        this.add.text(20, 45, 'Currently in Combat \nPress Space to attack ', {
			fontSize: '25px',
			color: '#ffffff'
		})
		this.player.handleIdleAnimation()
		// player idle animation
		this.player.anims.play('idle', true)
		this.enemy.anims.play('enemyIdle', true)
		// add collisions
		this.physics.add.overlap(this.enemy, this.spell, this.handleSpell, undefined, this)
	}
	
	update() {
		// update spells
		if (this.keys?.space.isDown) { 
			this.player?.castSpell(this.player,this.spell)
		}
		if (this.spell?.active == true) {
			this.spell.setX(this.spell.x + 1)
		}
	}

	private makeEnemy() {
		this.enemy = this.physics.add.sprite(400, 300, 'dragon')
		this.enemy
			.setScale(2)
			.setPosition(450, this.cameras.main.height - 80)
			.setCollideWorldBounds(true)
		this.enemy.flipX = true	
		this.anims.create({
			key: 'enemyIdle', 
			frames: this.anims.generateFrameNumbers('dragon', {
				start: 0, end: 7
			}), 
			frameRate: 10, repeat: -1
		})
		return this.enemy
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

	private handleSpell(enemy: Phaser.GameObjects.GameObject, spell: Phaser.GameObjects.GameObject) {
		(spell as Phaser.Physics.Arcade.Image).disableBody(true, true);
		(enemy as Phaser.Physics.Arcade.Image).setTint(0xff0000);
		this.enemy?.anims.stop();

		this.exit_combat();
	}

	private exit_combat(){
		this.add.text(20, 100, 'Combat Finished', {
			fontSize: '25px',
			color: '#ffffff',
			backgroundColor: '#ff0000'
		})
		this.input.on('pointerup', () => {
            this.scene.stop('combat_1')
            this.scene.start('level_1')
		})
	}
}
