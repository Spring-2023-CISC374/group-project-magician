import Phaser from 'phaser'
import MainCharacter from '../objects/MainCharacter';
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class combat_1 extends Phaser.Scene {
	private player?: MainCharacter
	private enemy?: Phaser.Physics.Arcade.Sprite
	private spell?: Phaser.Physics.Arcade.Sprite
	private keys?: Phaser.Types.Input.Keyboard.CursorKeys;
	private currentHealth?: number
	private playerTurn: boolean
	private enemyHealth: number
	private spellDamage: number
	private isDisabled: boolean
	private enemyText?: Phaser.GameObjects.Text
	private enemyAttack?: Phaser.GameObjects.Text
	private playerAttack?: Phaser.GameObjects.Text
	private timer?: Phaser.Time.Clock

	constructor() { 
		super('combat_1') 
		this.playerTurn = true
		this.enemyHealth = 10
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
		this.load.image('button', 'assets/Icons/Inventory_Icon.png');
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'bg')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)		
		// create assets
		this.player = new MainCharacter(this, 80, 515, this.currentHealth as number)
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
		// create button to go to map
		this.add.existing(new Click_Change_Scene(this, 770, 525, 'button', () => {			
			this.scene.start('inventory')											
			this.scene.stop('combat_1')
		}));

		this.enemyText = this.add.text(400,20, 'Enemy health is: ' + this.enemyHealth, {
			fontSize: '25px',
			color: '#ff0000'
		})

		this.playerAttack = this.add.text(20,115,"You have hit the monster for 5 HP!", 
		{
			fontSize: '30px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
		this.playerAttack.setVisible(false)

		this.enemyAttack = this.add.text(20,150,"You have been hit by the monster for 10 HP!", 
		{
			fontSize: '30px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
		this.enemyAttack.setVisible(false)
    }

	update() {
		this.enemyText?.setText('Enemy health is: ' + this.enemyHealth)
		this.player?.setText()
		this.currentHealth = this.currentHealth as number;
		this.enemyAttack = this.enemyAttack as Phaser.GameObjects.Text;
		if (this.enemyHealth === 0) {
			this.handleDeath(this.enemy as Phaser.Physics.Arcade.Sprite)
		}
		// update spells
		if (this.keys?.space.isDown) { 
			this.player?.castSpell(this.player, this.spell as Phaser.Physics.Arcade.Sprite)
		}
		if (this.spell?.active == true) {
			this.spell.setX(this.spell.x + 2)
		}
		if (this.isDisabled == true) {
			this.handleEnemyAttack(this.enemyAttack, this.currentHealth)
			this.resetSpellPosition(this.player as Phaser.GameObjects.Sprite)
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

	private handleDeath(enemy: Phaser.GameObjects.GameObject) {
		(enemy as Phaser.Physics.Arcade.Image).setTint(0xff0000);
		this.enemy?.anims.stop();
		this.exit_combat();
	}

	private handleSpell(enemy: Phaser.GameObjects.GameObject, spell: Phaser.GameObjects.GameObject) {
		(spell as Phaser.Physics.Arcade.Image).disableBody(true, true);
		this.handleCharacterAttack(this.playerAttack as Phaser.GameObjects.Text);
		this.isDisabled = true
	}

	private handleEnemyAttack(enemyAttack: Phaser.GameObjects.Text, currentHealth: number) {
		currentHealth -= 10;
		console.log(currentHealth)
		this.player?.setHealth(this.player?.getHealth()-10);
		enemyAttack.setVisible(true);
		setTimeout(()=> {
			enemyAttack.setVisible(false)
		}, 4000);	
	}
	
	private handleCharacterAttack(playerAttack: Phaser.GameObjects.Text) {
		this.enemyHealth -= this.spellDamage;
		playerAttack?.setVisible(true)
		setTimeout(()=> {
			playerAttack?.setVisible(false)
		}, 4000)
	}

	private resetSpellPosition(player: Phaser.GameObjects.Sprite) {
		this.spell?.enableBody(true, player.x + 30, player.y, true, false)
		this.spell?.setActive(false)
		this.isDisabled = false;
	}

	private exit_combat(){
		this.add.text(400, 45, 'Combat Finished', {
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
