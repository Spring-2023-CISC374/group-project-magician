import Phaser from 'phaser'
import CommonLevel from './CommonLevel'
import Inventory_Items from '../objects/Inventory_Items'

export default class start extends CommonLevel {
	private op_text?: Phaser.GameObjects.Text
	constructor() {
		super('start')
	}

	preload() {
		this.load.image('bg', 'assets/background/dark_forest.png')
	}

	create() {	
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'bg')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)	

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