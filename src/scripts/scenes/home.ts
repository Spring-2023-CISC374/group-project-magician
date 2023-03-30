import Phaser from 'phaser'

export default class home extends Phaser.Scene {
	constructor() {
		super('home')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(10, 20, 'Currently at Home \nClick for Map', {
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