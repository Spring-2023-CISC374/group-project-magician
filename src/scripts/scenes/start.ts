import Phaser from 'phaser'
import CommonLevel from './CommonLevel'
import Inventory_Items from '../objects/Inventory_Items'

export default class start extends CommonLevel {
	private op_text?: Phaser.GameObjects.Text
	constructor() {
		super('start')
	}

	preload() {
		//load image  for start screen here
	}

	create() {	

		const inventory: Inventory_Items = new Inventory_Items()

		console.log(inventory)

		this.op_text = this.add.text(175, 250, 'Currently at Start \n Click for Home', {
			fontSize: '40px',
			color: '#ffffff'
		})

		this.currentHealth = 100

		this.input.on('pointerup', () => {
			this.op_text?.setText("LETS GO!!!")
			this.scene.stop('start')
			this.scene.start('home', {inventory_items: inventory, prev_scene: 'start', storedHeath: this.currentHealth})
		})

	}

	update() {
		//
	}
}