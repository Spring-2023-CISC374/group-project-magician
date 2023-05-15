import Phaser from 'phaser'

export default class endscene extends Phaser.Scene {
	private op_text!: Phaser.GameObjects.Text
	constructor() { super('endscene') }
	preload() {
		//
	}
	create() {	
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'start_background')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)	
		this.op_text = this.add.text(100, 250, 'You Win!\nYou Defeated the evil Dragon\nCongratulations', {
			fontSize: '40px',
			color: '#ffffff'
		})
	}
	update() {
		//
	}
	get_op_text() {
		return this.op_text;
	}
}
