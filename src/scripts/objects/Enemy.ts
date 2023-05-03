//import MainCharacter from "./MainCharacter";
//import Spell from "./Spell";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    public statusEffect: boolean

    constructor(scene: any, x: any, y: any, enemy: string) {
        super(scene, x, y, enemy)

        this.statusEffect = false;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(2).setCollideWorldBounds(true);
		this.flipX = true	
    }

    getStatusEffect() {
        return this.statusEffect;
    }

    setStatusEffect(effect: boolean) {
        this.statusEffect = effect;
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
