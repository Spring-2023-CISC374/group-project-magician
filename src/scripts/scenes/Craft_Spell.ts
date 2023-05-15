import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import DraggableImage from '../objects/DragImage';
import Inventory_Items from '../objects/Inventory_Items';

export default class inventory extends Phaser.Scene {
	//private count = 0
	//private countText?: Phaser.GameObjects.Text
	private blueGemText?: Phaser.GameObjects.Text
	private redGemText?: Phaser.GameObjects.Text
	private yellowGemText?: Phaser.GameObjects.Text
	private greenGemText?: Phaser.GameObjects.Text

	private blueGems= 5
	private redGems= 5
	private yellowGems = 5
	private greenGems = 5
	prev_scene!: string;		
	
	protected inventory!: Inventory_Items
    protected currentHealth!: number

	constructor() {
		super('craft_spell')
	}

	init (data: any) {
		console.log('inventory, Craft_Spell', data)
		this.currentHealth = data.storedHealth
		this.inventory = data.inventory_items
	}

	create() {	
		this.add.image(400, 400, 'inventoryBackground')	

		this.add.existing(new Click_Change_Scene(this, 770, 570, 'exit_icon', () => {		// enter combat button
			this.scene.start('home', {inventory_items: this.inventory, prev_scene: this.scene.key})
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

		this.add.existing(new DraggableImage(this, 50, 150, "red-gem")) // making a draggable red gem image

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