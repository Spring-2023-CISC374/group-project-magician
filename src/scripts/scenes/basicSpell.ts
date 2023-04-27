import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';

export default class basicSpell extends Phaser.Scene {
    public inventory!: Inventory_Items
	protected prev_scene!: string	
    
	constructor() {
		super('basicSpell')
	}

    init(data: any) {
		console.log("basic spell scene = ", data);
		this.inventory = data.inventory_items
		this.prev_scene = data.prev_scene
	}

	preload() {
        //load image for start screen here
		this.load.image('background-craftSpells', 'assets/background/magicshop_bakground.png');
    }

    create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-craftSpells')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))

        //telling the location
        this.add.text(10, 40, 'Currently at Basic Spell\nPress the Back Button to go to Craft\nSpell', {
            fontSize: '32px',
            color: '#ffffff'
        });

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('craftSpells');
            this.scene.stop('basicSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map');
            this.scene.stop('basicSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key})
			this.scene.stop('basicSpell')
		}));

		this.add.text(50, 150, 'Click the button below to pick your spell', {
            fontSize: '28px',
            color: '#ffffff',
        });

        this.add.existing(new Click_Change_Scene(this, 175, 230, 'waterIcon', () => {        // inventory button
            this.scene.start('waterSpellBasic');
            this.scene.stop('basicSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 375, 230, 'airIcon', () => {        // inventory button
            this.scene.start('waterSpellBasic');
            this.scene.stop('basicSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 600, 230, 'fireIcon', () => {        // inventory button
            this.scene.start('waterSpellBasic');
            this.scene.stop('basicSpell');
        }));


    }
}