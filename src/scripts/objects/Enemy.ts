export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    private health: number
    private enemyHealth: Phaser.GameObjects.Text;
    private enemyAttack: Phaser.GameObjects.Text
    private enemyDamage: number
    constructor(scene: any, x: any, y: any, enemy: string, healthValue: number, newDamage: number) {
        super(scene, x, y, enemy)

        this.health = healthValue;
        this.enemyDamage = newDamage
        this.enemyHealth = this.scene.add.text(20,20, '')
        this.enemyHealth.setVisible(false)
        this.enemyAttack = this.scene.add.text(20,20, '')
        this.enemyAttack.setVisible(false)
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
    displayHealth() {
        this.enemyHealth = this.scene.add.text(20,20, 'Current health is: ' + this.health, {
			fontSize: '25px',
			color: '#ff0000'
		})
    }
    displayAttack() {
        this.enemyAttack = this.scene.add.text(20,150,"You have been hit by the monster for " + this.enemyDamage + " HP!", 
		{
			fontSize: '30px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
    }
    setText() {
        this.enemyHealth.setText('Current health is: ' + this.health)
    }
}