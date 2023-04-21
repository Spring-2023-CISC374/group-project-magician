import MainCharacter from "./MainCharacter";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private health: number
    private enemyHealth: Phaser.GameObjects.Text;
    private enemyAttack: Phaser.GameObjects.Text
    private enemyDamage: number
    constructor(scene: any, x: any, y: any, enemy: string, healthValue: number, newDamage: number) {
        super(scene, x, y, enemy)

        this.health = healthValue;
        this.enemyDamage = newDamage
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setCollideWorldBounds(true);
		this.setPosition(450, this.scene.cameras.main.height - 80)
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
			fontSize: '30px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
        this.enemyAttack.setVisible(false)
    }
    handleCharacterAttacked(player: MainCharacter, damage: number) {
        this.health -= damage
		player.setVisibility(true)
		setTimeout(()=> {
			player.setVisibility(false)
		}, 4000)	
    }
    setText() {
        this.enemyHealth.setText('Health ' + this.health)
    }
    setVisibility(visible: boolean) {
            this.enemyAttack.setVisible(visible)
    }
    displayEnemyAttack() {
        this.enemyAttack = this.scene.add.text(20,150,"You have been hit by the monster for 10 HP!", 
		{
			fontSize: '30px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
		this.enemyAttack.setVisible(false)
    }
}