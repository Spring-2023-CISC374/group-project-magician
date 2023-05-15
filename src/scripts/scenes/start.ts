import Phaser from 'phaser'
import CommonLevel from './CommonLevel'
import Inventory_Items from '../objects/Inventory_Items'

export default class start extends CommonLevel {
	private op_text?: Phaser.GameObjects.Text
	constructor() { super('start') }

	create() {	
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'start_background')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)	

		this.add.image(this.cameras.main.width/2, 50, 'text_banner').setScale(3)
		this.add.text(this.cameras.main.width/2, 50, "Magician")
			.setColor('black').setFontSize(30).setDepth(1).setOrigin(0.5)

		const inventory: Inventory_Items = new Inventory_Items()
		console.log("Testing npm run deploy")
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
}
