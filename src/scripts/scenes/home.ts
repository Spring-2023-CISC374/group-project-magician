import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class home extends Phaser.Scene {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	constructor() {
		super('home')
	}

	create() {	
		const background = this.physics.add.image(400, 300, 'home_Background')
		const home_marker = this.physics.add.image(500,400,'home_marker')

		this.add.existing(new Click_Change_Scene(this, 50, 50, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('home')
		}));

		this.add.existing(new Click_Change_Scene(this, 50, 200, 'inventory_icon', () => {		// enter inventory
			this.scene.start('inventory') 
			this.scene.stop('level_1')
		}));

		home_marker.setScale(2)

        this.add.text(0, 40, 'Currently at Home \n Press the Map Icon to go to Map', {
			fontSize: '32px',
			color: '#ffffff'
		})
	}

}