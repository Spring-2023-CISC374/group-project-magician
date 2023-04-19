import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';

export default class inventory extends Phaser.Scene {
	//private count = 0
	//private countText?: Phaser.GameObjects.Text
	private blueGemText?: Phaser.GameObjects.Text
	private redGemText?: Phaser.GameObjects.Text
	private yellowGemText?: Phaser.GameObjects.Text
	private greenGemText?: Phaser.GameObjects.Text

	private blueGems = 5
	private redGems = 5
	private yellowGems = 5
	private greenGems = 5
	prev_scene!: string;					

	constructor() {
		super('inventory')
	}

	init(data: any) {
		console.log("inventory scene = ", data);
		this.blueGems = this.blueGems + data.blueGemsCollected;
		this.redGems = this.redGems + data.redGemsCollected
		this.yellowGems = this.yellowGems + data.yellowGemsCollected
		this.greenGems = this.greenGems + data.greenGemsCollected
		this.prev_scene = data.prev_scene
	}

	preload() {
		//load image  for start screen here
		this.load.image('inventoryBackground', 'assets/background_inventory.png');
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

		this.redGemText = this.add.text(10, 150, 'Red Gems: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.redGemText?.setText('Red Gems: ' + this.redGems)

		this.blueGemText = this.add.text(10, 200, 'Blue Gems: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.blueGemText?.setText('Blue Gems: ' + this.blueGems)

		this.yellowGemText = this.add.text(10, 250, 'Yellow Gems: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.yellowGemText?.setText('Yellow Gems: ' + this.yellowGems)

		this.greenGemText = this.add.text(10, 300, 'Green Gems: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.greenGemText?.setText('Green Gems: ' + this.greenGems)
	}
	//commented out count and count text, removed this.countText = this.add.text from 4 lines.

	update() {
		//
	}

}