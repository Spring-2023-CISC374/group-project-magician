//import Spell from "./Spell"
export default class SpellButtons extends Phaser.GameObjects.Image {

    //spellList: Array<Spell>
    //currentSpell: Spell
    constructor(scene: Phaser.Scene, x: number, y: number,
        texture: string, callback: () => void) {
        super(scene, x, y, texture);
        console.log("the enter map button has been created")
          // creates a button 
        /*
        const darkSpell = new Spell(this.scene, 100, 100, 'darkSpell', 5)
        const fireSpell = new Spell(this.scene, 100, 100, 'fireSpell', 10)
        const iceSpell = new Spell(this.scene, 100, 100, 'iceSpell', 8)
        this.spellList = [darkSpell,fireSpell,iceSpell]
        this.currentSpell = darkSpell
        */
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
        this.setTint(  0xffdd00 );
    }

    enterButtonRestState() {
        this.setTint( 0xffffff );
    }

    enterButtonActiveState() {
        this.setTint( 0x22ff00 );
    }
}