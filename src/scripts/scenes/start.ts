import Phaser from 'phaser'
import CommonLevel from './CommonLevel'

export default class start extends CommonLevel {
	private op_text?: Phaser.GameObjects.Text
	constructor() {
		super('start')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

    this.op_text = this.add.text(175, 250, 'Currently at Start \n Click for Home', {
		fontSize: '40px',
		color: '#ffffff'
	})

    this.input.on('pointerup', () => {
		this.op_text?.setText("LETS GO!!!")
        this.scene.stop('start', {blueGemsCollected: 0, 
			redGemsCollected: 0, 
			yellowGemsCollected: 0, 
			greenGemsCollected: 0})
		console.log(this.data)
        this.scene.start('home')
	})
	}
	

	update() {
		//
	}
}