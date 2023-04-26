import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';

export default class inventory extends Phaser.Scene {
	//private count = 0
	//private countText?: Phaser.GameObjects.Text
	private blueGemsCollected: number
	prev_scene!: string;					

	constructor() {
		super('inventory')
	}

	init(data: any) {
		console.log("inventory scene = ", data);
		this.blueGemsCollected = data.blueGemsCollected;
	}

	preload() {
		//load image  for start screen here
		//this.load.image('inventoryBackground', 'assets/background_inventory.png');
	}

	create() {	
		this.add.image(400, 400, 'inventoryBackground')	

		this.add.existing(new Click_Change_Scene(this, 770, 570, 'exit_icon', () => {		// enter combat button
			this.scene.start('level_1')
			this.scene.stop('inventory')
		}));

        this.add.text(10, 40, 'Currently on Inventory \nClick X to return to Level', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.text(10, 150, 'Red Berries: ', {
			fontSize: '20px',
			color: '#ffffff'
		})

		this.add.text(160, 150, 'count: 0', { 
			fontSize: '20px' })

		this.add.text(10, 250, 'Blue Gems: ' + this.blueGemsCollected, {
			fontSize: '20px',
			color: '#ffffff'
		})

		this.add.text(10, 350, 'Green Berries: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.add.text(180, 350, 'count: 0', { 
			fontSize: '20px' })

		this.add.text(10, 450, 'Yellow Berries: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.add.text(190, 450, 'count: 0', { 
			fontSize: '20px' })
	}
	//commented out count and count text, removed this.countText = this.add.text from 4 lines.

	update() {
		//
	}

}