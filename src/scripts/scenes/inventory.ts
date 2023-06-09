import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
//import DraggableImage from '../objects/DragImage';
import Inventory_Items from '../objects/Inventory_Items';

export default class inventory extends Phaser.Scene {
	//private count = 0
	//private countText?: Phaser.GameObjects.Text
	private blueGemText?: Phaser.GameObjects.Text
	private redGemText?: Phaser.GameObjects.Text
	private yellowGemText?: Phaser.GameObjects.Text
	private greenGemText?: Phaser.GameObjects.Text

	private basicWaterSpellText?: Phaser.GameObjects.Text
	private basicAirSpellText?: Phaser.GameObjects.Text
	private loopingWaterSpellText?: Phaser.GameObjects.Text
	private loopingAirSpellText?: Phaser.GameObjects.Text
	//private waterSpellText?: Phaser.GameObjects.Text
	//private waterSpell?: number
	

	public inventory!: Inventory_Items
	protected currentHealth!: number
	public prev_scene!: string;					


	constructor() {
		super('inventory')
	}

	init(data: any) {
		console.log("inventory scene = ", data);
		this.inventory = data.inventory_items
		this.prev_scene = data.prev_scene
		this.currentHealth = data.storedHealth
	}


	preload() {
		//load image  for start screen here
		//this.load.image('inventoryBackground', 'assets/background_inventory.png');
	}

	create() {	
		this.add.image(400, 400, 'inventoryBackground')	

		this.add.existing(new Click_Change_Scene(this, 770, 570, 'exit_icon', () => {		// enter combat button
			this.scene.start(this.prev_scene, {inventory_items: this.inventory, prev_scene: "inventory", storedHealth: this.currentHealth})
			console.log("Going to Level 1: ", this.data)
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
		this.redGemText?.setText('Red Gems: ' + this.inventory.redGems)

		//this.add.existing(new DraggableImage(this, 50, 150, "red-gem")) // making a draggable red gem image

		this.blueGemText = this.add.text(10, 200, 'Blue Gems: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.blueGemText?.setText('Blue Gems: ' + this.inventory.blueGems)

		this.yellowGemText = this.add.text(10, 250, 'Yellow Gems: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.yellowGemText?.setText('Yellow Gems: ' + this.inventory.yellowGems)

		this.greenGemText = this.add.text(10, 300, 'Green Gems: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.greenGemText?.setText('Green Gems: ' + this.inventory.greenGems)

		console.log(this.inventory)
		
		//starting spells
		//this.waterSpell = this.inventory.waterSpell;
	
		this.basicWaterSpellText = this.add.text(400, 150, 'Basic Water Spell: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.basicWaterSpellText?.setText('Basic Water Spell: ' + this.inventory.basicWaterSpell)

		this.basicAirSpellText = this.add.text(400, 200, 'Basic Air Spell: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.basicAirSpellText?.setText('Basic Air Spell: ' + this.inventory.basicAirSpell)

		this.loopingWaterSpellText = this.add.text(400, 350, 'Looping Water Spell: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.loopingWaterSpellText?.setText('Looping Water Spell: ' + this.inventory.loopingWaterSpell)

		this.loopingAirSpellText = this.add.text(400, 400, 'Looping Air Spell: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.loopingAirSpellText?.setText('Looping Air Spell: ' + this.inventory.loopingAirSpell)

		
	

	}
	//commented out count and count text, removed this.countText = this.add.text from 4 lines.

	update() {
		//
	}

}