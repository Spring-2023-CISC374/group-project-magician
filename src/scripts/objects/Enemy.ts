import EnemyAttack from "./EnemyAttack";
import MainCharacter from "./MainCharacter";
import Spell from "./Spell";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private health: number
    private enemyHealth!: Phaser.GameObjects.Text;
    private enemyAttack!: Phaser.GameObjects.Text
    private enemyDamage: number
    private statusEffect: boolean
    private noMoreText!: boolean

    constructor(scene: any, x: any, y: any, enemy: string, healthValue: number, newDamage: number) {
        super(scene, x, y, enemy)

        this.health = healthValue;
        this.enemyDamage = newDamage
        this.statusEffect = false;
        this.noMoreText = true;
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

    displayAttack(attack: EnemyAttack) {
        this.enemyAttack = this.scene.add.text(20,230,"You have been hit by the monster for " + attack.getattackDamage() + " HP!", 
		{
			fontSize: '30px',
			color: '#ffffff',
			backgroundColor: '#880000'
		})
        this.enemyAttack.setVisible(false)
    }

    handleCharacterAttacked(player: MainCharacter, spell: Spell, attack: EnemyAttack) {
        if (this.statusEffect === true) {
            this.health -= 5
        }
        if (spell.name === "Dark Spell") {
            this.health = Math.floor(this.health * 0.80);
        } else if (spell.name === "Fire Spell") {
            this.statusEffect = true;
            this.health -= 5;
        } else if(spell.name === "Ice Spell") {
            this.health -= 5;
            if (attack.getattackDamage() > 2) {
                attack.setattackDamage(attack.getattackDamage() - 2);
            }
        } else {
            this.health -= spell.getSpellDamage();
        }

        // Displays the text that the character has attacked the monster
		player.setVisibility(true)
        this.noMoreText = false;
		setTimeout(()=> {
			player.setVisibility(false)
            this.noMoreText = true;
		}, 3000)	
    }

    attackPlayer(enemyAttack: EnemyAttack) {
        setTimeout(()=> {
			enemyAttack
            .setActive(true)
            .setVisible(true)
        enemyAttack.anims.play('dragon_attack', true)
		}, 3000)	
    }

    setText() {
        this.enemyHealth.setText('Health: ' + this.health)
    }

    setVisibility(visible: boolean) {
        this.enemyAttack.setVisible(visible)
    }

    setAttackText(attack: EnemyAttack) {
        this.enemyAttack.setText("You have been hit by the monster for\n" + attack.getattackDamage() + " HP!")
    }

    displayEnemyAttack(attack: EnemyAttack) {
        this.enemyAttack = this.scene.add.text(20,150,"You have been hit by the monster for " + attack.getattackDamage() + " HP!", 
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
			key: 'enemy_idle', 
			frames: this.anims.generateFrameNumbers('dragon', {
				start: 0, end: 7
			}), 
			frameRate: 5, repeat: -1
		})
    }
    getNoMoreText() {
        return this.noMoreText;
    }
}
