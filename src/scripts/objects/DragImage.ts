export default class DraggableImage extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);      

        this.setInteractive();
        scene.input.setDraggable(this);

        this.on('pointerover', () => {
            this.setTint(0x44ff44);
        });

        this.on('pointerout', () => {
            this.clearTint();
        });

        // input.on  drag event  Pointer triggering event, gameObject, x & y
        scene.input.on('drag', this.handleDrag, this);

    }
    // when this is called from other scenes it will pass these values    
    handleDrag(mouse: Phaser.Input.Pointer, gameObject: DraggableImage, dragX: number, dragY: number) {
        console.log("handleDrag " + this.x + " " + this.y);
        this.x = dragX;
        this.y = dragY;
    }    
   
}