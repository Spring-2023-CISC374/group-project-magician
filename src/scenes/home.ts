import Phaser from 'phaser'

export default class startScene extends Phaser.Scene {
	constructor() {
		super('home')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(550, 400, 'Click to Play \n Again!!!!', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('start-scene')
            this.scene.start('home')
		})
	}
	

	update() {
		//
	}

}