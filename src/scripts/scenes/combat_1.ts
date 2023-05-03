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
	private noMoreText!: boolean
	private characterCombatHealth!: Phaser.GameObjects.Text
	private characterAttack!: Phaser.GameObjects.Text
    private enemyHealth!: Phaser.GameObjects.Text;
	private enemyHealthRemaining!: number;
    private enemyAttack!: Phaser.GameObjects.Text
    private enemyDamage!: number

	constructor() { 
		super('combat_1') 
		this.noMoreText = true;
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
		this.displayPlayerCombatHealth()
		
		this.enemy = new Enemy(this, 400, 525, 'dragon')
		this.enemyHealthRemaining = 80;
        this.enemyDamage = 10;
		this.enemy.handleEnemyAnims()
		this.enemy.anims.play('enemyIdle', true)

		const darkSpell = new Spell(this, this.player.x + 30, this.player.y, 'darkSpell',"Dark Spell", 5)
        const fireSpell = new Spell(this, this.player.x + 30, this.player.y, 'fireSpell',"Fire Spell", 10)
        const iceSpell = new Spell(this, this.player.x + 30, this.player.y, 'iceSpell',"Ice Spell", 8)
        this.spellList = [darkSpell,fireSpell,iceSpell]
		this.spell = this.spellList[0]
		this.spell.handleSpellAnims()
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
				if (this.getNoMoreTextPlayer() === true && this.spell.active === false) {		
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

		this.characterAttack = this.add.text(20,115,"You have hit the monster for 0 HP", 
		{
			fontSize: '20px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		}) // letting the player know what they have done
        this.characterAttack.setVisible(false)

		this.add.existing(new Click_Change_Scene(this, 770, 525, 'chest', () => {
			// create button to go to inventory
			this.scene.start('inventory')											
			this.scene.stop('combat_1')
		}))

		this.displayEnemyHealth()
		this.displayEnemyAttack()
		
    }

	// attempting to fix 1000 errors

	update() {
		this.setPlayerAttackText(this.spell)
		this.setTextPlayer()
		this.setEnemyAttackText()
		this.setEnemyText()
		// update spells
		if (this.getEnemyHealth() <= 0) {
			if (this.handleEnemyDeath())
			this.handlePlayerLeavingCombat("combat_1", "map")
		}
		if (this.keys?.space.isDown && this.spell?.active==false && this.getNoMoreTextPlayer() === true) { 
			this.player?.castSpell(this.player,this.spell)
		}
		if (this.spell?.active == true) {
			this.spell.moveSpell()
		}
		if (this.spell?.isDisabled() == true) {
			this.handlePlayerBeingAttacked(this.enemy, this.getEnemyDamage())
			this.spell.resetSpellPosition(this.player)
		}
		if (this.enemy.getStatusEffect() === true) {
			const flameEffect = this.add.image(this.enemy.x, this.enemy.y - 100, 'flame') 
			console.log(flameEffect) // to remove warning until implementation
		}
		this.spell?.checkForOverlap(this.player, this.enemy)
	}

	handlePlayerBeingAttacked(enemy: Enemy, damage: number): boolean {
        this.currentHealth -= damage
		enemy.setVisible(true)
        this.noMoreText = false;
		setTimeout(()=> {
			enemy.setVisible(false)
            this.noMoreText = true;
		}, 5000)	
        return true // attmpting to avoid premature scene ending
    }

    setPlayerAttackText(spell: Spell) {   
        if (spell.name === "Dark Spell") {
            this.characterAttack.setText("You have hit the monster for 20% of their currebt HP!")
        }
        else if (spell.name === "Fire Spell") {
            this.characterAttack.setText("You have hit the monster for 5, activated fire DOT")
        } else if(spell.name === "Ice Spell") {
            this.characterAttack.setText("You have hit the monster for 5, and reduced their damage")
        }
        else {
            this.characterAttack.setText("You have hit the monster for " + spell.getSpellDamage())
        } 
    }

	displayPlayerCombatHealth() {
        this.characterCombatHealth = this.add.text(this.player.x - 75,this.player.y - 75, 'Health: ' + this.currentHealth, {
			fontSize: '25px',
			color: '#ff0000',
            fontStyle: "bold"
		})
    }

    handlePlayerLeavingCombat(currentScene: string, newScene: string): boolean {
        setTimeout(()=> {
            this.scene.stop(currentScene)
            this.scene.start(newScene, {storedHealth: this.currentHealth})
		}, 5000)
        return true // attmpting to avoid premature scene ending
    }

	getNoMoreTextPlayer() {
        return this.noMoreText;
    }

	setTextPlayer() {
        this.characterCombatHealth.setText('Health: ' + this.currentHealth)
    }
    
    setNoMoreTextPlayer(flag: boolean) {
        this.noMoreText = flag;
    }

	setVisibilityPlayer(visible: boolean) {
        this.characterAttack.setVisible(visible)
    }

	// enemy functions 

	getEnemyHealth() {
        return this.enemyHealthRemaining;
    }

    setEnemyHealth(newHealth: number) {
        this.enemyHealthRemaining = newHealth;
    }

    getEnemyDamage() {
        return this.enemyDamage
    }

    setEnemyDamage(newDamage: number) {
        this.enemyDamage = newDamage;
    }

    displayEnemyHealth() {
        this.enemyHealth = this.add.text(this.enemy.x-75,this.enemy.y - 75, 'Health: ' + this.enemyHealthRemaining, {
			fontSize: '25px',
			color: '#ff0000',
			fontStyle: "bold"
		})
    }

    displayEnemyAttack() {
        this.enemyAttack = this.add.text(20,150,"You have been hit by the monster for " + this.enemyDamage + " HP!", 
		{
			fontSize: '20px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
        this.enemyAttack.setVisible(false)
    }

    handleEnemyAttacked(player: MainCharacter, spell: Spell): boolean { 
        if (this.enemy.statusEffect === true) {
            this.enemyHealthRemaining -= 5
        }
        if (spell.name === "Dark Spell") {
            this.enemyHealthRemaining = Math.floor(this.enemyHealthRemaining * 0.80);
         }
        else if (spell.name === "Fire Spell") {
            this.enemy.statusEffect = true;
            this.enemyHealthRemaining -= 5;
        } else if(spell.name === "Ice Spell") {
            this.enemyHealthRemaining -= 5;
            if (this.enemyDamage > 2) {
                this.enemyDamage -= 2;
            }
        }
        else {
            this.enemyHealthRemaining -= spell.getSpellDamage();
        }
        
		player.setVisible(true)
		setTimeout(()=> {       // timout
			player.setVisible(false)
		}, 5000)	
        return true // attmpting to avoid premature scene ending
    }

    setEnemyText() {
        this.enemyHealth.setText('Health: ' + this.enemyHealthRemaining)
    }

    setEnemyVisibility(visible: boolean) {
            this.enemyAttack.setVisible(visible)
    }

    setEnemyAttackText() {
        this.enemyAttack.setText("You have been hit by the monster for " + this.enemyDamage + " HP!")
    }

    handleEnemyDeath(): boolean{
        this.enemy.setTint(0xff0000);    // timeout
        setTimeout(()=> {
			this.enemy.disableBody(true, true)
            this.enemyHealth.setVisible(false)
		}, 5000)	
		this.enemy.anims.stop();
		this.add.text(400, 45, 'Enemy Dead', {
			fontSize: '25px',
			color: '#ffffff',
			backgroundColor: '#ff0000'
		})
        return true // attmpting to avoid premature scene ending
    }
	
}
