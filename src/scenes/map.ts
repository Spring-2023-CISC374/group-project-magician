import Phaser from 'phaser'

export default class map extends Phaser.Scene {
	constructor() {
		super('map')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(0, 40, 'currently on Map \n Click for Level 1', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('map')
            this.scene.start('level_1')
		})
	}
	

	update() {
		//
	}

}