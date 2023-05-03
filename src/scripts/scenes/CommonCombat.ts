import Phaser from 'phaser'
import MainCharacter from '../objects/MainCharacter';
import Enemy from '../objects/Enemy';
import Spell from '../objects/Spell'
import SpellButtons from '../objects/SpellButtons'

export default class CommonCombat extends Phaser.Scene {
	protected player!: MainCharacter
	protected enemy!: Enemy
	protected spell!: Spell
	protected keys!: Phaser.Types.Input.Keyboard.CursorKeys;
	protected currentHealth!: number
	protected spellList!: Array<Spell>
	protected statusEffect!: Phaser.GameObjects.Image

	constructor(key: any) {
		super(key)
	}

	init (data: any) {
		console.log('init', data)
		this.currentHealth = data.storedHealth
        //this.spellList = data.storedSpellList
	}

	preload() {
        //
	}

	create() {	
        //Creates player at 80, 515, and passes the current health
        this.createPlayer(80, 515, this.currentHealth)
        //this.createEnemy(400, 525, 'dragon', 80, 10)
        //Creates and then plays enemy anims
		
        this.enemyAnims()
        //Creates spell list, sets spell to first one in the list, as long as no spell list was passed
		this.createOriginalSpellList()
		this.spell = this.spellList[0]
        this.spell.handleSpellAnims()
        //creates spell buttons
		this.makeSpellButtons()
        //activates keyboard
		this.keys = this.input.keyboard.createCursorKeys();
		// scene text
        this.displayGuide()
        //Players health, enemy health, and enemy damage message
        this.player.displayCombatHealth()
		this.enemy.displayHealth()
		this.enemy.displayAttack()
    }

	update() {
		this.onUpdate()
	}
    //functions used in combat and common combat scene
	handleLeavingCombatToMap() {
		setTimeout(()=> {
			this.scene.stop(this.scene as unknown as string)
			this.scene.start('map', {storedHealth: this.currentHealth})
		}, 5000)
	}
    onUpdate() {//Need to reuse handle spell anims or animations won't work
        this.spell.handleSpellAnims()
        this.player?.setAttackText(this.spell)
		this.player?.setText()
		this.enemy?.setAttackText()
		this.enemy?.setText()
		// update spells
		if (this.enemy?.getHealth() <= 0) {
			this.handleEnemyDeath()
			this.handleLeavingCombatToMap();
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
		if (this.enemy.getStatusEffect() === true && this.enemy?.getHealth() > 0) {
			this.statusEffect.setVisible(true)
		}
		this.spell?.checkForOverlap(this.player, this.enemy)
    }
    makeInitialStatusEffect(imageKey: string) {
        this.statusEffect = this.add.image(this.enemy.x, this.enemy.y - 100, imageKey) 
		this.statusEffect.setVisible(false)
    }
    makeSpellButtons() {
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
    }
    displayGuide() {
        this.add.text(20, 45, 'Currently in Combat \nSelect a spell then press Space to attack ', {
			fontSize: '25px',
			color: '#ffffff'
		})
    }
    handleEnemyDeath(){
        this.statusEffect.setVisible(false);
        (this.enemy as Phaser.Physics.Arcade.Image).setTint(0xff0000);
        this.enemy.setEnemyHealthBar(false);
		this.enemy.anims.stop();
		this.add.text(400, 45, 'Enemy Dead', {
			fontSize: '25px',
			color: '#ffffff',
			backgroundColor: '#ff0000'
		})
    }
    createOriginalSpellList() {
        const darkSpell = new Spell(this, this.player.x + 30, this.player.y, 'darkSpell',"Dark Spell", 5)
        const fireSpell = new Spell(this, this.player.x + 30, this.player.y, 'fireSpell',"Fire Spell", 10)
        const iceSpell = new Spell(this, this.player.x + 30, this.player.y, 'iceSpell',"Ice Spell", 8)
        this.spellList = [darkSpell,fireSpell,iceSpell]
    }
    enemyAnims() {
        this.enemy.handleEnemyAnims()
		this.enemy.anims.play('enemyIdle', true)
    }
    createEnemy(x: number, y: number, sprite: string, health: number, damage: number) {
        this.enemy = new Enemy(this, x, y, sprite, health, damage)
    }
    createPlayer(x: number, y: number, health: number) {
        this.player = new MainCharacter(this, x, y, health)
		this.player.handleAnims()
		this.player.anims.play('idle', true)
    }
}
