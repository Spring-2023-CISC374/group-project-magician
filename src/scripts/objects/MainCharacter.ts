export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
    private health: number
    constructor(scene: any, x: any, y: any, healthValue: number) {
        super(scene, x, y, 'mainChar')

        this.health = healthValue;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setCollideWorldBounds(true);

    }
    handleMoving(player: MainCharacter, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		if (!cursors) {
			return
		}
        if (cursors.left.isDown) {
			player.setVelocityX(-160)
		}
		else if(cursors.right.isDown){
			player.setVelocityX(160)
		}
		else if(cursors.down.isDown){
			player.setVelocityY(160)
		}
		else if(cursors.up.isDown){
			player.setVelocityY(-160)
		}
		else {
			player.setVelocityX(0)
			player.setVelocityY(0)
		}
	}

    handleEnemyCollision(player: MainCharacter, enemy: Phaser.Physics.Arcade.Sprite, 
        currentScene: Phaser.Scene, newScene: Phaser.Scene) {
        this.scene.physics.add.overlap(player, enemy, () => {
        this.scene.scene.stop(currentScene)
        this.scene.scene.start(newScene)
        })
    }
    handleMapCollision(player: MainCharacter, mapElement: Phaser.Physics.Arcade.Image, 
        currentScene: Phaser.Scene, newScene: Phaser.Scene) {
        this.scene.physics.add.overlap(player, mapElement, () => {
        this.scene.scene.stop(currentScene)
        this.scene.scene.start(newScene, {storedHealth: this.health})
        })
    }
    getHealth() {
        return this.health;
    }
    setHealth(newHealth: number) {
        this.health = newHealth;
    }
    displayHealth() {
        this.scene.add.text(0,100, 'Current health is: ' + this.health, {
			fontSize: '32px',
			color: '#ff0000'
		})
    }
}
