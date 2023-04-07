import Phaser from 'phaser'

export default class start extends Phaser.Scene {
	constructor() {
		super('start')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(0, 400, 'Currently at start /n click for home', {
			fontSize: '40px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('start')
            this.scene.start('home')
		})
	}
	

	update() {
		//
	}

}