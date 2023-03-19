import Phaser from 'phaser'

export default class inventory extends Phaser.Scene {
	constructor() {
		super('inventory')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(0, 40, 'Currently on inventory \n click for Home', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('inventory')
            this.scene.start('home')
		})
	}
	

	update() {
		//
	}

}