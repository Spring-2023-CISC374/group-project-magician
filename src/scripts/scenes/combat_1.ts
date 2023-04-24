import Phaser from 'phaser'
import MainCharacter from '../objects/MainCharacter';
import Enemy from '../objects/Enemy';
import Click_Change_Scene from '../objects/Click_Change_Scene'
import Spell from '../objects/Spell'

export default class combat_1 extends Phaser.Scene {
	private player?: MainCharacter
	private enemy?: Enemy
	private spell?: Spell
	private keys?: Phaser.Types.Input.Keyboard.CursorKeys;
	private currentHealth: number



	constructor() { 
		super('combat_1') 
		//this.playerTurn = true
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
		this.player = new MainCharacter(this, 80, 515, this.currentHealth as number)
		this.player.displayCombatHealth()
		//this.enemy = this.makeEnemy()
		this.enemy = new Enemy(this, 400, 300, 'dragon', 10, 10)
		this.makeAnims()

		this.spell = new Spell(this, this.player.x + 30, this.player.y, 'darkSpell', 5)
		this.makeSpellAnims()
		this.keys = this.input.keyboard.createCursorKeys();
		// scene text
        this.add.text(20, 45, 'Currently in Combat \nPress Space to attack ', {
			fontSize: '25px',
			color: '#ffffff'
		})
		this.player.handleIdleAnimation()
		// player idle animation
		this.enemy.anims.play('enemyIdle', true)
		// add collisions
		this.spell.checkForOverlap(this.player, this.enemy)
		
		this.add.existing(new Click_Change_Scene(this, 770, 525, 'chest', () => {
			// create button to go to inventory
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
			this.spell.moveSpell()
		}
		if (this.spell?.isDisabled() == true) {
			this.player?.handleBeingAttacked(this.enemy, this.enemy?.getEnemyDamage())
			this.spell.resetSpellPosition(this.player)
		}
	}
	
	private makeSpellAnims() {
		this.anims.create({
				key: 'dark_spell', 
				frames: this.anims.generateFrameNumbers('darkSpell', {
					start: 0, end: 6
				}), 
				frameRate: 10, repeat: -1
			}) 		
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
