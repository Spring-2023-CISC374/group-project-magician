//import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
//import Inventory_Items from '../objects/Inventory_Items';
import CommonLevel from './CommonLevel'


export default class craftSpells extends CommonLevel {
	//protected inventory!: Inventory_Items
    //protected currentHealth!: number

	constructor() {
		super('craftSpells')
	}

	init (data: any) {
		console.log('craftSpells', data)
		this.currentHealth = data.storedHealth
		this.inventory = data.inventory_items
	}
/*
	createInformation() {
		this.add.image(this.cameras.main.width/2, 50, 'text_banner').setScale(4)
		this.add.text(this.cameras.main.width/2, 50, this.scene.key.toUpperCase())
			.setColor('black').setFontSize(30).setDepth(1).setOrigin(0.5)
	}
*/
	preload() {
		//load image  for start screen here
		this.load.image('background-craftSpells', 'assets/background/magicshop_bakground.png');
		this.load.image('loopIcon', 'assets/Icons/loopIcon.png');
		this.load.image('starIcon', 'assets/Icons/stars-craft.png');
	}

	create() {	
		//making background
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-craftSpells')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))
				
		super.createInformation()
		//telling the character their location
        //this.add.text(10, 40, 'Currently on Crafting Spells \nClick on Map Button to go to the Map\nClick on Inventory Button to go to\nInventory\nClick on Back Button to return to Level', {
		//	fontSize: '32px',
		//	color: '#ffffff'
		//})

		//this.createInformation()

		this.add.text(75, 125, 'Select What Spell You Want To Make', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.text(200, 200, 'Looping', {
			fontSize: '22px',
			color: '#ffffff'
		})
		this.add.text(500, 200, 'Basic', {
			fontSize: '22px',
			color: '#ffffff'
		})
		//this.add.text(550, 200, 'Unlocked!', {
		//	fontSize: '22px',
		//	color: '#ffffff'
		//})

		//adding the buttons to go to different scenes
        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {			// create button to go to map
			this.scene.start('map', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth})											
			this.scene.stop('resource')
		}));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth})
			this.scene.stop('resource')
		}));

		this.add.existing(new Click_Change_Scene(this, 240, 270, 'loopIcon', () => {			// create button to go to map
			this.scene.start('loopSpell', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth})											
			this.scene.stop('resource')
		}));

		this.add.existing(new Click_Change_Scene(this, 540, 260, 'starIcon', () => {			// create button to go to map
			this.scene.start('basicSpell', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth})											
			this.scene.stop('resource')
		}));
		

		//buttons to go back
		this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {		// back button
			this.scene.start('level_1', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth})
			this.scene.stop('resource')
		}));

		
	}
	//commented out count and count text, removed this.countText = this.add.text from 4 lines.

	update() {
		//
	}

}