import Phaser from 'phaser'

export default class start extends Phaser.Scene {
	constructor() {
		super('preload')
	}

	preload() {
        //loading the buttons
		this.load.image('inventory_icon', 'assets/Icons/Inventory_Icon.png')	// button to enter inventory
		this.load.image('map_marker','assets/Icons/map.png')					// button to return to map
        this.load.image('home_marker','assets/Icons/house.png')                 // button to return home
		this.load.image('exit_icon', 'assets/icons/exit_Icon.png');             // button to exit inventory
		this.load.image('level_1_marker','assets/Icons/Pink_1.png')
        //dragon 
        this.load.image('go','assets/Icons/Pink_1.png')					        // dragon
	}

	create() {
		this.scene.start('start')
		console.log('started main scene')
	}
}