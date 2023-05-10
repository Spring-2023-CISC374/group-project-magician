import Phaser from 'phaser'
import MainCharacter from '../objects/MainCharacter';
import Enemy from '../objects/Enemy';
import Spell from '../objects/Spell'
import SpellButtons from '../objects/SpellButtons'
import Inventory_Items from '../objects/Inventory_Items';
import EnemyAttack from '../objects/EnemyAttack';

export default class CommonCombat extends Phaser.Scene {
	protected player!: MainCharacter
	protected enemy!: Enemy
	protected enemyAttack!: EnemyAttack
	protected spell!: Spell
	protected keys!: Phaser.Types.Input.Keyboard.CursorKeys;
	protected currentHealth!: number
	protected basicSpellList!: Array<Spell>
	protected statusEffect!: Phaser.GameObjects.Sprite
	protected inventory!: Inventory_Items
	protected timesCast!: number

	constructor(key: any) { super(key) }

	init (data: any) {
		console.log('init', data)
		this.currentHealth = data.storedHealth
		this.inventory = data.inventory_items
        //this.spellList = data.storedSpellList
	}

	create() {	
        //Creates player at 80, 515, and passes the current health
        this.createPlayer(80, 515, this.currentHealth)
        //this.createEnemy(400, 525, 'dragon', 80, 10)
        //Creates and then plays enemy anims
        this.enemyAnims()
		this.enemyAttack = new EnemyAttack(this, 370, this.enemy.y, 'dragonAttack', 'Dragon Attack', this.enemy.getEnemyDamage())
			.setActive(false)
			.setVisible(false)
		this.enemyAttack.flipX = true
        //Creates spell list, sets spell to first one in the list, as long as no spell list was passed
		this.createOriginalSpellList()
		this.spell = this.basicSpellList[0]
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
		this.enemy.displayAttack(this.enemyAttack)
		this.timesCast = 0
    }
    //functions used in combat and common combat scene
	handleLeavingCombatToMap() {
		setTimeout(()=> {
			this.scene.stop(this.scene as unknown as string)
			this.scene.start('map', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth })
		}, 5000)
	}

    update() { //Need to reuse handle spell anims or animations won't work
        this.spell.handleSpellAnims()
		this.enemyAttack.handleAttackAnims()
        this.player?.setAttackText(this.spell)
		this.player?.setText()
		this.enemy?.setAttackText(this.enemyAttack)
		this.enemy?.setText()
		// update spells
		if (this.enemyAttack?.active == true) {
			this.enemyAttack.moveAttack()
		}

		if (this.enemy.getStatusEffect() === true && this.enemy?.getHealth() > 0) {
			this.statusEffect.setVisible(true)
		}

		this.spell?.checkForOverlap(this.player, this.enemy, this.enemyAttack)
		this.enemyAttack.checkForOverlap(this.player, this.enemy)

		if (this.enemy?.getHealth() <= 0) {
			this.handleEnemyDeath()
			this.handleLeavingCombatToMap();
		}

		if (!this.spell.is_looping) {
			if (this.keys?.space.isDown && this.spell?.active==false && this.player.getNoMoreText() === true
			&& this.enemy.getNoMoreText() === true && this.enemyAttack.active === false 
			&& this.spell.getCantClick() === false ) { 
				this.player?.castSpell(this.player,this.spell)
			}
			if (this.spell?.active == true) {
				this.spell.moveSpell()
				this.enemyAttack.resetAttackPosition(this.enemy)
			}
			if (this.spell?.isDisabled() == true) {
				this.enemy.attackPlayer(this.enemyAttack)
				this.spell.resetSpellPosition(this.player)
			}
		} else {
			if (this.keys?.space.isDown && this.spell?.active==false && this.player.getNoMoreText() === true
			&& this.enemy.getNoMoreText() === true && this.enemyAttack.active === false 
			&& this.spell.getCantClick() === false && this.keys.space.isDown == true 
			&& this.spell?.active==false) { // initialize the castiung of the spell
				console.log("first part cast");
				this.player.castLoopSpell(this.player, this.spell)
			}
			if (this.spell?.active == true) {
				this.spell.moveSpell()
			}
			if (this.spell?.isDisabled() == true) {
				if (this.timesCast < 2) { // once we have cast the spell 3 times, we are done 
					console.log(this.timesCast);
					this.player.castLoopSpell(this.player, this.spell)
					this.timesCast++;
				} else {
					this.timesCast = 0; // resetting the number of times the spell was cast
					this.enemyAttack = new EnemyAttack(this, 370, this.enemy.y, 'dragonAttack', 'Dragon Attack', this.enemy.getEnemyDamage())
						.setActive(false)
						.setVisible(false)
					this.enemyAttack.flipX = true
					this.enemy.attackPlayer(this.enemyAttack)
				}
				this.spell.resetSpellPosition(this.player)
			}
		}
    }


    makeInitialStatusEffect(imageKey: string) {
        this.statusEffect = this.add.sprite(this.enemy.x, this.enemy.y - 120, imageKey) 
		this.statusEffect.setVisible(false)
    }
    makeSpellButtons() {
        this.add.text(10, 300, "Choose Your Spell:" , {
			fontSize: '12px',
			color: '#ffffff'
		})
		let currentX = 60;
		for (const newSpell of this.basicSpellList) {
			this.add.text(currentX-30, 325, newSpell.getName(), {
			fontSize: '12px',
			color: '#ffffff'
		})
			// create button to go to map
			this.add.existing(new SpellButtons(this, currentX, 375, newSpell.texture as unknown as string, () => {
				if (this.player.getNoMoreText() === true && this.spell.active === false &&
				this.enemy.getNoMoreText() === true && this.enemyAttack.active === false
				&& this.spell.getCantClick() === false) {		
					this.spell = newSpell
					this.spell.displayOnClick(this.player, this.enemy, this.enemyAttack)
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
		const darkSpell = new Spell(this, this.player.x + 30, this.player.y, 'darkSpell',"Dark Spell", 5, false)
        const fireSpell = new Spell(this, this.player.x + 30, this.player.y, 'fireSpell',"Fire Spell", 10, false)
        const iceSpell = new Spell(this, this.player.x + 30, this.player.y, 'iceSpell',"Ice Spell", 5, false)
		
        this.basicSpellList = [darkSpell,fireSpell, iceSpell]
		if (this.inventory.basicAirSpell > 0) {
			this.basicSpellList.push(new Spell(this, this.player.x + 30, this.player.y, 'windSpell',"Basic Air", 5, false))
		} if (this.inventory.basicWaterSpell > 0) {
			this.basicSpellList.push(new Spell(this, this.player.x + 30, this.player.y, 'waterSpell',"Basic Water", 5, false))
		} if (this.inventory.loopingAirSpell > 0) {
			this.basicSpellList.push(new Spell(this, this.player.x + 30, this.player.y, 'windSpell',"Looping Air", 5, true))
		} if (this.inventory.loopingWaterSpell > 0) {
			this.basicSpellList.push(new Spell(this, this.player.x + 30, this.player.y, 'waterSpell',"Looping Water", 5, true))
		}
		console.log("creating the spell list")
		console.log("deploy  ")
		console.log(this.basicSpellList)
    }
    enemyAnims() {
        this.enemy.handleEnemyAnims()
		this.enemy.anims.play('enemy_idle', true)
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
