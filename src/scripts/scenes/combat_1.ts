import Phaser from 'phaser'
import MainCharacter from '../objects/MainCharacter';
import Enemy from '../objects/Enemy';
import Click_Change_Scene from '../objects/Click_Change_Scene'
import Spell from '../objects/Spell'
import SpellButtons from '../objects/SpellButtons'

export default class combat_1 extends Phaser.Scene {
	private player!: MainCharacter
	private enemy!: Enemy
	private spell!: Spell
	private keys!: Phaser.Types.Input.Keyboard.CursorKeys;
	private currentHealth!: number
	private spellList!: Array<Spell>

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
		//spell images
		this.load.spritesheet('fireSpell', 'assets/spells/fireBoltSheet.png', 
		{frameWidth: 44, frameHeight: 48})
		this.load.spritesheet('iceSpell', 'assets/spells/iceSpell.png', 
		{frameWidth: 48, frameHeight: 32})
		// load images
		this.load.image('bg', 'assets/background/dark_forest.png')
		this.load.image('run_away_icon', 'assets/Icons/run_away.png');
		this.load.image('chest', 'assets/Icons/Inventory_Icon.png');
		this.load.image('flame', 'assets/Icons/smallFlame.png')
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'bg')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)		
		// create assets
		this.player = new MainCharacter(this, 80, 515, this.currentHealth)
		this.player.handleAnims()
		this.player.anims.play('idle', true)
		this.player.displayCombatHealth()
		
		this.enemy = new Enemy(this, 400, 525, 'dragon', 80, 10)
		this.enemy.handleEnemyAnims()
		this.enemy.anims.play('enemyIdle', true)

		const darkSpell = new Spell(this, this.player.x + 30, this.player.y, 'darkSpell',"Dark Spell", 5)
        const fireSpell = new Spell(this, this.player.x + 30, this.player.y, 'fireSpell',"Fire Spell", 10)
        const iceSpell = new Spell(this, this.player.x + 30, this.player.y, 'iceSpell',"Ice Spell", 8)
        this.spellList = [darkSpell,fireSpell,iceSpell]
		this.spell = this.spellList[0]
		this.add.text(10, 300, "Choose Your Spell:" , {
			fontSize: '12px',
			color: '#ffffff'
		})
		let currentX = 200;
		for (const newSpell of this.spellList) {
			this.add.text(currentX-25, 300, newSpell.getName(), {
			fontSize: '12px',
			color: '#ffffff'
		})
			// create button to go to map
			this.add.existing(new SpellButtons(this, currentX, 350, newSpell.texture as unknown as string, () => {
				if (this.player.getNoMoreText() === true && this.spell.active === false) {		
					this.spell = newSpell
				}
			}));
			currentX+=100;
		}
		this.keys = this.input.keyboard.createCursorKeys();
		// scene text
        this.add.text(20, 45, 'Currently in Combat \nPress Space to attack ', {
			fontSize: '25px',
			color: '#ffffff'
		})

		this.add.existing(new Click_Change_Scene(this, 770, 525, 'chest', () => {
			// create button to go to inventory
			this.scene.start('inventory')											
			this.scene.stop('combat_1')
		}))

		this.enemy.displayHealth()
		this.enemy.displayAttack()
		
    }

	update() {
		this.player?.setAttackText(this.spell)
		this.player?.setText()
		this.enemy?.setAttackText()
		this.enemy?.setText()
		// update spells
		if (this.enemy?.getHealth() <= 0) {
			this.enemy?.handleEnemyDeath()
			this.player?.handleLeavingCombat("combat_1", "map")
		}
		if (this.keys?.space.isDown && this.spell?.active==false && this.player.getNoMoreText() === true) { 
			this.player?.castSpell(this.player,this.spell)
		}
		if (this.spell?.active == true) {
			this.spell.moveSpell()
		}
		if (this.spell?.isDisabled() == true) {
			this.player?.handleBeingAttacked(this.enemy, this.enemy?.getEnemyDamage())
			this.spell.resetSpellPosition(this.player)
		}
		if (this.enemy.getStatusEffect() === true) {
			const flameEffect = this.add.image(this.enemy.x, this.enemy.y - 100, 'flame') 
			console.log(flameEffect) // to remove warning until implementation
		}
		this.spell?.checkForOverlap(this.player, this.enemy)
	}
}
