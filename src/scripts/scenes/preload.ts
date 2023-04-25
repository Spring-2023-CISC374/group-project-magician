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

		//spell images
		/*
		this.load.spritesheet('fireSpell', 'assets/spells/fireBoltSheet.png', 
		{frameWidth: 44, frameHeight: 48})
		this.load.spritesheet('iceSpell', 'assets/spells/iceSpell.png', 
		{frameWidth: 48, frameHeight: 32})
		*/

		//image for inventory button
		this.load.image('button', 'assets/player.png');

		// for petal
		this.load.image('petal', "assets/petal.png");
		
		//background image for level 1
		this.load.image('background-level1', 'assets/background/night_forest.png');

		// loading gems for inventory and resource gathering
		this.load.image('blue-gem', 'assets/resource/bluegem.png');
		this.load.image('red-gem', 'assets/resource/redgem.png');
		this.load.image('yellow-gem', 'assets/resource/yellowgem.png');
		this.load.image('green-gem', 'assets/resource/greengem.png');
	}

	create() {
		this.scene.start('start')
		console.log('started main scene')
	}
}