import Phaser from 'phaser'

export default class start extends Phaser.Scene {
	constructor() {
		super('start')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

    const message = this.add.text(175, 250, 'Currently at Start \n Click for Home', {
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