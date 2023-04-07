//This button is going to allow the user to exit the inventory
// this is an 'image' button 
// tint changes on pointer events
export default class Click_Change_Scene extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number,
         texture: string, callback: () => void) {
        super(scene, x, y, texture);
        console.log("the enter map button has been created")
          // creates a button 
        
        this.setInteractive({ useHandCursor
            : true })
        .on('pointerover', () => this.enterButtonHoverState())
        .on('pointerout', () => this.enterButtonRestState())
        .on('pointerdown', () => this.enterButtonActiveState())
        .on('pointerup', () => {
            this.enterButtonHoverState();
            callback();
        });

    }

    enterButtonHoverState() {
        this.setTint(  0x44ff44 );
    }

    enterButtonRestState() {
        this.setTint( 0x42ff44 );
    }

    enterButtonActiveState() {
        this.setTint( 0x22ff44 );
    }
}