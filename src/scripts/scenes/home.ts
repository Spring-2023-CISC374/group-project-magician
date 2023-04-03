import Phaser from 'phaser'

export default class home extends Phaser.Scene {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	constructor() {
		super('home')
	}

	preload() {
		//load image  for start screen here
		this.load.image('home_marker','assets/Icons/house.png')
		this.load.image('map_marker','assets/Icons/map.png')
	}

	create() {	
		const home_marker = this.physics.add.image(500,400,'home_marker')
		const map_marker = this.physics.add.image(300,400,'map_marker')

		home_marker.setScale(5)

        this.add.text(0, 40, 'Currently at Home \n Press the map Icon to go to map', {
			fontSize: '32px',
			color: '#ffffff'
		})

		// change to new scene when map icon pressed
		map_marker.setInteractive().on('pointerout', () => {
            this.scene.stop('home')
            this.scene.start('map')
		})
	}

	update() {
		//
	}

}