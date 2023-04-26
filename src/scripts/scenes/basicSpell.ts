import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';

export default class basicSpell extends Phaser.Scene {
	constructor() {
		super('basicSpell')
	}

	preload() {
        //load image for start screen here
		this.load.image('background-craftSpells', 'assets/background/magicshop_bakground.png');
    }

    create() {
        //making background
        //this.add.image(400, 400, 'inventoryBackground')
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-craftSpells')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))
        //const bg = this.add.image(
        //    this.cameras.main.width/2, this.cameras.main.height/2, 'background-spells');
        //bg.setScale(
        //    this.cameras.main.width/(1.5 * bg.width), this.cameras.main.height/(1.75 * bg.height));

        //telling the location
        const message = this.add.text(10, 40, 'Currently at Basic Spell\nPress the Back Button to go to Craft\nSpell', {
            fontSize: '32px',
            color: '#ffffff'
        });

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('craftSpells');
            this.scene.stop('loopSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map');
            this.scene.stop('resource');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {        // inventory button
            this.scene.start('inventory', {
                "blueGemsCollected": this.blueGemsCollected
            });
            this.scene.stop('resource');
        }));

		const waterButtonText = this.add.text(50, 150, 'Click the button below to pick your spell', {
            fontSize: '28px',
            color: '#ffffff',
            //backgroundColor: '#333333',
            //padding: { x: 10, y: 5 }
        });

        this.add.existing(new Click_Change_Scene(this, 175, 230, 'waterIcon', () => {        // inventory button
            this.scene.start('waterSpellBasic');
            this.scene.stop('loopSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 375, 230, 'airIcon', () => {        // inventory button
            this.scene.start('waterSpellBasic');
            this.scene.stop('loopSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 600, 230, 'fireIcon', () => {        // inventory button
            this.scene.start('waterSpellBasic');
            this.scene.stop('loopSpell');
        }));


    }
}