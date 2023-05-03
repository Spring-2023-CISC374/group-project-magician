
//import Phaser from 'phaser'
//import MainCharacter from '../objects/MainCharacter';
//import Enemy from '../objects/Enemy';
//import Spell from '../objects/Spell'
//import SpellButtons from '../objects/SpellButtons'

import CommonCombat from "./CommonCombat"
export default class combat_1 extends CommonCombat {
	constructor() { super('combat_1') }

	preload() {
		//
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'bg')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)	
		super.createEnemy(400, 525, 'dragon', 80, 10)
		super.makeInitialStatusEffect('flame')
		super.create()
		console.log(this.enemy)
    }

	// attempting to fix 1000 errors

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
