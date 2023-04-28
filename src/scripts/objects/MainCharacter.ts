import Enemy from "./Enemy"
import Inventory_Items from "./Inventory_Items"
import Spell from "./Spell"
export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
    private health: number
    private characterHealth!: Phaser.GameObjects.Text
    private characterCombatHealth!: Phaser.GameObjects.Text
    private characterAttack!: Phaser.GameObjects.Text
    private noMoreText!: boolean
    
    constructor(scene: any, x: any, y: any, healthValue: number) {
        super(scene, x, y, 'mainChar')
        this.noMoreText = true;
        this.health = healthValue;
        this.characterAttack = this.scene.add.text(20,115,"You have hit the monster for 0 HP", 
		{
			fontSize: '20px',
			color: '#ff0000',
			backgroundColor: '#ffffff'
		})
        this.characterAttack.setVisible(false)
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2);
        this.setCollideWorldBounds(true);
    }
    
    handleMoving(player: MainCharacter, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		if (!cursors) { return }
        if (cursors.left.isDown) {
			player.setVelocityX(-160)
            player.flipX = true
            player.anims.play('walk', true)
		}
		else if(cursors.right.isDown){
			player.setVelocityX(160)
            player.flipX = false
            player.anims.play('walk', true)
		}
        else {
            player.setVelocityX(0)
            player.anims.play('idle', true)
        }
        if(cursors.down.isDown){
			player.setVelocityY(160)
		}
		else if(cursors.up.isDown){
			player.setVelocityY(-160)
            player.anims.play('jump', true)
		}
		else {
			player.setVelocityY(0)
		}
	}

    levelhandleMoving(player: MainCharacter, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		if (!cursors) { return }
        if (cursors.left.isDown) {
			player.setVelocityX(-160)
            player.flipX = false
            player.anims.play('walk', true)
		}
		else if(cursors.right.isDown){
			player.setVelocityX(160)
            player.flipX = false
            player.anims.play('walk', true)
		}
        else {
			player.setVelocityX(0)
            player.anims.play('idle', true)
		}
		if(cursors.up.isDown && player.body.touching.down) {
			player.setVelocityY(-330)
            player.anims.play('jump', true)
        }
	}

    handleEnemyCollision(player: MainCharacter, enemy: Phaser.Physics.Arcade.Sprite, 
        currentScene: string, newScene: string, inventory: Inventory_Items) {
        this.scene.physics.add.overlap(player, enemy, () => {
        this.scene.scene.stop(currentScene)
        this.scene.scene.start(newScene, { inventory_items: inventory, storedHealth: this.health })
        })
    }

    handleMapCollision(player: MainCharacter, mapElement: Phaser.Physics.Arcade.Image, 
        currentScene: string, newScene: string, inventory: Inventory_Items) {
        this.scene.physics.add.overlap(player, mapElement, () => {
        this.scene.scene.stop(currentScene)
        this.scene.scene.start(newScene, {inventory_items: inventory, storedHealth: this.health})
        })
    }

    getHealth() {
        return this.health;
    }

    setHealth(newHealth: number) {
        this.health = newHealth;
        this.characterHealth
    }

    displayHealth() {
        this.characterHealth = this.scene.add.text(20,20, 'Current health is: ' + this.health, {
			fontSize: '25px',
			color: '#ff0000',
            fontStyle: "bold"
		})
    }

    displayCombatHealth() {
        this.characterCombatHealth = this.scene.add.text(this.x - 75,this.y - 75, 'Health: ' + this.health, {
			fontSize: '25px',
			color: '#ff0000',
            fontStyle: "bold"
		})
    }

    handleAnims() {
        this.anims.create({
            key: 'idle', 
            frames: this.anims.generateFrameNumbers('player', {
                start: 0, end: 1
            }), 
            frameRate: 5, repeat: -1
        })
        this.anims.create({
            key: 'walk', 
            frames: this.anims.generateFrameNumbers('player', {
                start: 25, end: 32
            }), 
            frameRate: 8
        })
        this.anims.create({
            key: 'jump', 
            frames: this.anims.generateFrameNumbers('player', {
                start: 48, end: 55
            }), 
            frameRate: 8
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
        this.characterCombatHealth.setText('Health: ' + this.health)
    }

    setVisibility(visible: boolean) {
        this.characterAttack.setVisible(visible)
    }

    handleBeingAttacked(enemy: Enemy, damage: number) {
        this.health -= damage
		enemy.setVisibility(true)
        this.noMoreText = false;
		setTimeout(()=> {
			enemy.setVisibility(false)
            this.noMoreText = true;
		}, 5000)	
    }

    setAttackText(spell: Spell) {   
        if (spell.name === "Dark Spell") {
            this.characterAttack.setText("You have hit the monster for 30% of their currebt HP!")
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

    handleLeavingCombat(currentScene: string, newScene: string) {
        setTimeout(()=> {
            this.scene.scene.stop(currentScene)
            this.scene.scene.start(newScene, {storedHealth: this.health})
		}, 5000)
    }

    setSpellPosition(spell: Spell) {
        spell.x = this.x + 30;
        spell.y = this.y;
    }

    getNoMoreText() {
        return this.noMoreText;
    }
    
    setNoMoreText(flag: boolean) {
        this.noMoreText = flag;
    }
}
