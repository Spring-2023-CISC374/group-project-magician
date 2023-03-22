export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: any, x: any, y: any) {
        super(scene, x, y, 'mainChar')


        scene.add.existing(this);
        scene.physics.add.existing(this);


        this.setScale(2);
        this.setCollideWorldBounds(true);
    }
}
