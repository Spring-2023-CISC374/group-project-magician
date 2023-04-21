import Phaser from 'phaser'
import MainCharacter from '../objects/MainCharacter';
import Enemy from '../objects/Enemy';
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class combat_1 extends Phaser.Scene {
	private player?: MainCharacter
	private enemy?: Enemy
	private spell?: Phaser.Physics.Arcade.Sprite
	private keys?: Phaser.Types.Input.Keyboard.CursorKeys;
	private currentHealth: number
	//private playerTurn: boolean
	private spellDamage: number
	private isDisabled: boolean
	//private enemyText: Phaser.GameObjects.Text

	constructor() { 
		super('combat_1') 
		//this.playerTurn = true
		this.spellDamage = 5
		this.isDisabled = false;
	}

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
		this.load.image('chest', 'assets/Icons/Inventory_Icon.png');
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'bg')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)		
		// create assets
		this.player = new MainCharacter(this, 80, 515, this.currentHealth)
		this.player.displayCombatHealth()
		//this.enemy = this.makeEnemy()
		this.enemy = new Enemy(this, 400, 300, 'dragon', 10, 10)
		this.makeAnims()
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
		
		this.add.existing(new Click_Change_Scene(this, 770, 525, 'chest', () => {			// create button to go to map
			this.scene.start('inventory')											
			this.scene.stop('combat_1')
		}))

		this.enemy.displayHealth()
		this.enemy.displayAttack()
		this.player.displayAttack()
		
    }

	update() {

		this.enemy?.setText()
		this.player?.setText()
		// update spells
		if (this.enemy?.getHealth() === 0) {
			this.enemy?.handleEnemyDeath()
			this.player?.handleLeavingCombat("combat_1", "map")
		}
		if (this.keys?.space.isDown && this.spell?.active==false) { 
			this.player?.castSpell(this.player,this.spell)
		}
		if (this.spell?.active == true) {
			this.spell.setX(this.spell.x + 2)
		}
		if (this.isDisabled == true) {
			this.player?.handleBeingAttacked(this.enemy, this.enemy?.getEnemyDamage())
			this.resetSpellPosition()
		}
		
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
	private resetSpellPosition() {
		this.spell?.enableBody(true, this.player.x + 30, this.player.y, true, false)
		this.spell?.setActive(false)
		this.isDisabled = false;
	}

	private handleSpell(enemy:Phaser.GameObjects.GameObject, spell: Phaser.GameObjects.GameObject) {
		(spell as Phaser.Physics.Arcade.Image).disableBody(true, true);
		this.enemy?.handleCharacterAttacked(this.player, this.spellDamage)
		this.isDisabled = true
	}
	//Make anims for enemy
	private makeAnims() {
		this.anims.create({
			key: 'enemyIdle', 
			frames: this.anims.generateFrameNumbers('dragon', {
				start: 0, end: 7
			}), 
			frameRate: 10, repeat: -1
		})
	}
}
