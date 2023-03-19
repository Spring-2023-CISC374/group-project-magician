import Phaser from 'phaser'

export default class combat_1 extends Phaser.Scene {
	constructor() {
		super('combat_1')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

        this.add.text(550, 400, 'Currently in Combat \n Click for inventory', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('combat_1')
            this.scene.start('inventory')
		})
	}
	

	update() {
		//
	}

}