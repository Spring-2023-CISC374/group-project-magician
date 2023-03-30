import Phaser from 'phaser'

export default class level_1 extends Phaser.Scene {
	constructor() {
		super('level_1')
	}

	preload() {
		//load image  for start screen here 
		//this.load.image('soil4', 'assets/background/soil4.png')
	}

	create() {		
		//this.add.image(400, 300, 'soil4').setScale(3.5);

        this.add.text(10, 20, 'Currently at Level 1 \nClick for Combat', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('level_1')
            this.scene.start('combat_1')
		})
	}
	

	update() {
		//
	}

}