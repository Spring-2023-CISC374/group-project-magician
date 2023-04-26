import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';

export default class craftSpells extends Phaser.Scene {			

	constructor() {
		super('craftSpells')
	}

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
		

		//telling the character their location
        this.add.text(10, 40, 'Currently on Crafting Spells \nClick on Map Button to go to the Map\nClick on Inventory Button to go to\nInventory\nClick on Back Button to return to Level', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.text(150, 215, 'Select Your Spell Template', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.text(150, 300, 'Looping', {
			fontSize: '22px',
			color: '#ffffff'
		})
		this.add.text(350, 300, 'Basic', {
			fontSize: '22px',
			color: '#ffffff'
		})
		this.add.text(550, 300, 'Unlocked!', {
			fontSize: '22px',
			color: '#ffffff'
		})

		//adding the buttons to go to different scenes
        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('resource')
		}));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory', {
				"blueGemsCollected": this.blueGemsCollected
			})
			this.scene.stop('resource')
		}));

		this.add.existing(new Click_Change_Scene(this, 190, 370, 'loopIcon', () => {			// create button to go to map
			this.scene.start('loopSpell')											
			this.scene.stop('resource')
		}));

		this.add.existing(new Click_Change_Scene(this, 380, 360, 'starIcon', () => {			// create button to go to map
			this.scene.start('basicSpell')											
			this.scene.stop('resource')
		}));
		

		//buttons to go back
		this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {		// back button
			this.scene.start('level_1')
			this.scene.stop('resource')
		}));

		
	}
	//commented out count and count text, removed this.countText = this.add.text from 4 lines.

	update() {
		//
	}

}