import Phaser from 'phaser'

export default class home extends Phaser.Scene {
	constructor() {
		super('home')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(0, 40, 'Currently at Home \n click for map', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('home')
            this.scene.start('map')
		})
	}
	

	update() {
		//
	}

}