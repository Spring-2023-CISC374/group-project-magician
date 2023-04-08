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
		// player sprit
		this.load.spritesheet('mainChar', 'assets/hooded_sprite_16x28_no_background.png',
		{frameWidth: 16, frameHeight:28})
		// enemy sprites
		this.load.spritesheet('dragon', 'assets/enemies/dragon.png',				
		{frameWidth: 32, frameHeight: 32})										// enemy dragon
		// background stuff
		this.load.image('home_Background', 'assets/background/Cherry_Blossom_Background.png');

		//image for inventory button
		this.load.image('button', 'assets/inventory-bag.png');
	}

	create() {
		this.scene.start('start')
		console.log('started main scene')
	}
}