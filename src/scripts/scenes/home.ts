import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class home extends Phaser.Scene {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	constructor() {
		super('home')
	}

	create() {	
		const home_marker = this.physics.add.image(500,400,'home_marker')

		this.add.existing(new Click_Change_Scene(this, 50, 50, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('home')
		}));

		home_marker.setScale(5)

        this.add.text(0, 40, 'Currently at Home \n Press the map Icon to go to map', {
			fontSize: '32px',
			color: '#ffffff'
		})
	}

}