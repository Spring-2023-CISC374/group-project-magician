import MainCharacter from "./MainCharacter";
import Spell from "./Spell";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private health: number
    private enemyHealth!: Phaser.GameObjects.Text;
    private enemyAttack!: Phaser.GameObjects.Text
    private enemyDamage: number
    private statusEffect: boolean

    constructor(scene: any, x: any, y: any, enemy: string, healthValue: number, newDamage: number) {
        super(scene, x, y, enemy)

        this.health = healthValue;
        this.enemyDamage = newDamage
        this.statusEffect = false;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2).setCollideWorldBounds(true);
		this.flipX = true	
    }

    getHealth() {
        return this.health;
    }

    setHealth(newHealth: number) {
        this.health = newHealth;
    }

    getEnemyDamage() {
        return this.enemyDamage
    }

    setEnemyDamage(newDamage: number) {
        this.enemyDamage = newDamage;
    }

    displayHealth() {
        this.enemyHealth = this.scene.add.text(this.x-75,this.y - 75, 'Health: ' + this.health, {
			fontSize: '25px',
			color: '#ff0000',
			fontStyle: "bold"
		})
    }

    displayAttack() {
        this.enemyAttack = this.scene.add.text(20,150,"You have been hit by the monster for " + this.enemyDamage + " HP!", 
		{
			fontSize: '20px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
        this.enemyAttack.setVisible(false)
    }

    handleCharacterAttacked(player: MainCharacter, spell: Spell) {
        if (this.statusEffect === true) {
            this.health -= 5
        }
        if (spell.name === "Dark Spell") {
            this.health = Math.floor(this.health * 0.80);
         }
        else if (spell.name === "Fire Spell") {
            this.statusEffect = true;
            this.health -= 5;
        } else if(spell.name === "Ice Spell") {
            this.health -= 5;
            if (this.enemyDamage > 2) {
                this.enemyDamage -= 2;
            }
        }
        else {
            this.health -= spell.getSpellDamage();
        }
        
		player.setVisibility(true)
		setTimeout(()=> {
			player.setVisibility(false)
		}, 5000)	
    }

    setText() {
        this.enemyHealth.setText('Health: ' + this.health)
    }

    setVisibility(visible: boolean) {
            this.enemyAttack.setVisible(visible)
    }

    setAttackText() {
        this.enemyAttack.setText("You have been hit by the monster for " + this.enemyDamage + " HP!")
    }

    displayEnemyAttack() {
        this.enemyAttack = this.scene.add.text(20,150,"You have been hit by the monster for " + this.enemyDamage + " HP!", 
		{
			fontSize: '20px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
		this.enemyAttack.setVisible(false)
    }

    handleEnemyDeath(){
        (this as Phaser.Physics.Arcade.Image).setTint(0xff0000);
        setTimeout(()=> {
			this.disableBody(true, true)
            this.enemyHealth.setVisible(false)
		}, 5000)	
		this.anims.stop();
		this.scene.add.text(400, 45, 'Enemy Dead', {
			fontSize: '25px',
			color: '#ffffff',
			backgroundColor: '#ff0000'
		})
    }

    getStatusEffect() {
        return this.statusEffect;
    }

    setStatusEffect(effect: boolean) {
        this.statusEffect = effect;
    }
    setEnemyHealthBar(visible: boolean) {
        this.enemyHealth.setVisible(visible)
    }

    handleEnemyAnims() {
        this.anims.create({
			key: 'enemyIdle', 
			frames: this.anims.generateFrameNumbers('dragon', {
				start: 0, end: 7
			}), 
			frameRate: 5, repeat: -1
		})
    }
}
