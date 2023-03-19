import Phaser from 'phaser'

export default class startScene extends Phaser.Scene {
	constructor() {
		super('start-scene')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(550, 400, 'We are currently on /n the start Screne', {
			fontSize: '40px',
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