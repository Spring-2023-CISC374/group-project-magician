import Phaser from 'phaser'
import CommonLevel from './CommonLevel'

export default class start extends CommonLevel {
	private op_text!: Phaser.GameObjects.Text
	constructor() { super('end') }

	create() {	
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'start_background')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)	

		this.add.image(this.cameras.main.width/2, 50, 'text_banner').setScale(3)
		this.add.text(this.cameras.main.width/2, 50, "You Win!")
			.setColor('black').setFontSize(30).setDepth(1).setOrigin(0.5)

		console.log("Testing npm run deploy")
		this.op_text = this.add.text(175, 250, 'You Defeated the evil Dragon \n Congradulations', {
			fontSize: '40px',
			color: '#ffffff'
		})

		this.currentHealth = 100
	}
	get_op_text() {
		return this.op_text;
	}
}
