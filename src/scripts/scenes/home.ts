import Phaser from 'phaser'
import CommonLevel from './CommonLevel'

export default class home extends CommonLevel {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	constructor() {
		super('home')
	}

	create() {	
		const background = this.physics.add.image(400, 300, 'home_Background').setScale(1.5)
		const home_marker = this.physics.add.image(500,400,'home_marker')
		super.createInformation()
		super.createButtons(this.scene.scene)

		home_marker.setScale(2)
	}

}