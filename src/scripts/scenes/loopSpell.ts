import Phaser from 'phaser';
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';

export default class loopSpell extends Phaser.Scene {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	protected inventory!: Inventory_Items
    protected currentHealth!: number

    constructor() {
        super('loopSpell');
    }

    init (data: any) {
		console.log('loopspell', data)
		this.currentHealth = data.storedHealth
		this.inventory = data.inventory_items
	}

    createInformation() {
		this.add.image(this.cameras.main.width/2, 50, 'text_banner').setScale(4)
		this.add.text(this.cameras.main.width/2, 50, this.scene.key.toUpperCase())
			.setColor('black').setFontSize(30).setDepth(1).setOrigin(0.5)
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
       // this.add.text(10, 40, 'Currently at Loop Spell\nPress the Back Button to go to Craft\nSpell', {
        //    fontSize: '32px',
        //    color: '#ffffff'
        //}); // messages 
        //this.cursors// get rid of yellow squiggles

        this.createInformation()     

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('craftSpells', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('loopSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('resource');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {        // inventory button
            this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('resource');
        }));

		this.add.text(50, 150, 'Click the button below to pick your spell', {
            fontSize: '28px',
            color: '#ffffff',
            //backgroundColor: '#333333',
            //padding: { x: 10, y: 5 }
        }); // water button text

        this.add.existing(new Click_Change_Scene(this, 175, 230, 'waterIcon', () => {        // inventory button
            this.scene.start('waterSpell', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('loopSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 375, 230, 'airIcon', () => {        // inventory button
            this.scene.start('waterSpell', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('loopSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 600, 230, 'fireIcon', () => {        // inventory button
            this.scene.start('waterSpell', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('loopSpell');
        }));


    }
}


    //update() {
    //
    //}

/*
const waterButton = this.add.image(175, 230, 'waterIcon');
        waterButton.setInteractive();
        waterButton.on('pointerdown', () => {
            this.add.text(150, 275, 'You picked the Water Spell\nYou need to use 4 Gems to make this Spell\nPress the button below if you want to make\nthe spell', {
                fontSize: '20px',
                color: '0x0000',
            });
        });
//creating button and dropdown menu
        const button = this.add.text(150, 150, 'Click here to pick your spell', {
            fontSize: '28px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 10, y: 5 }
        })
        .setInteractive()
        .on('pointerdown', () => {
            if (!dropdown.visible) {
                dropdown.setVisible(true);
                output.setVisible(false);
            } else {
                dropdown.setVisible(false);
                output.setVisible(true);
            }
        });
        const options = ['Water Spell', 'Fire Spell', 'Air Spell'];
        const dropdown = this.add.container(250, 250, [
            this.add.rectangle(0, 0, 100, options.length * 40 + 10, 0x333333),
            ...options.map((option, index) => {
                return this.add.text(0, (index + 1) * 40, option, {
                    fontSize: '24px',
                    color: '#ffffff',
                    backgroundColor: '#666666',
                    padding: { x: 10, y: 5 }
                })
                .setInteractive()
                .on('pointerdown', () => {
                    dropdown.setVisible(false);
                    output.setVisible(true);
                    output.setText(`Selected Spell: ${option}`);
                });
            })
        ])
        .setVisible(false);
        //creating output text object
        const output = this.add.text(200, 200, '', {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 10, y: 5 }
        });
         this.scene.start('loopSpell', {
                "blueGemsCollected": this.blueGemsCollected
            });
            this.scene.stop('loopSpell');
*/