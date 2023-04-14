export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
    private health: number
    private characterHealth: Phaser.GameObjects.Text
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

    levelhandleMoving(player: MainCharacter, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		if (!cursors) {
			return
		}
        if (cursors.left.isDown) {
			player.setVelocityX(-160)
		}
		else if(cursors.right.isDown){
			player.setVelocityX(160)
		}
		//else if(cursors.up.isDown && player.body.touching.down){
		//	player.setVelocityY(-500)
		//}
		else if(cursors.up.isDown){
			player.setVelocityY(-500)
        }
		else {
			player.setVelocityX(0)
			player.setVelocityY(0)
		}
        //if(cursors.up.isDown && player.body.touching.down){
        //    player.setVelocityY(-500)
        //}
	}


    handleEnemyCollision(player: MainCharacter, enemy: Phaser.Physics.Arcade.Sprite, 
        currentScene: string, newScene: string) {
        this.scene.physics.add.overlap(player, enemy, () => {
        this.scene.scene.stop(currentScene)
        this.scene.scene.start(newScene, {storedHealth: this.health})
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
        this.characterHealth = this.scene.add.text(20,20, 'Current health is: ' + this.health, {
			fontSize: '25px',
			color: '#ff0000'
		})
    }
    handleIdleAnimation() {
        this.anims.create({
            key: 'idle', 
            frames: this.anims.generateFrameNumbers('player', {
                start: 0, end: 1
            }), 
            frameRate: 5, repeat: -1
        })
    this.anims.create({
        key: 'cast', 
        frames: this.anims.generateFrameNumbers('player', {
            start: 65, end: 68
        }), 
        frameRate: 8
        })
    }
    castSpell(player: MainCharacter, spell: Phaser.Physics.Arcade.Sprite) {
        player.anims.play('cast', true)
			.once('animationcomplete', () => {
				spell.setActive(true)
					.setVisible(true)
					.anims.play('dark_spell', true)
				player.anims.play('idle', true)
			})
    }
    setText() {
        this.characterHealth.setText('Current health is: ' + this.health)
    }
}
