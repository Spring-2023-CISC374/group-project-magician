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
		//resourse preload
		this.load.image('background-level1', 'assets/background/night_forest.png');
        this.load.image('ground', 'assets/Icons/platform.png');
        this.load.image('gem', 'assets/resource/bluegem.png');
        this.load.image('backbutton', 'assets/Icons/backbutton.png');
		this.load.image('bomb', 'assets/Icons/bomb.png' );

		//map preload
		this.load.image('overworld', 'assets/background/overworldResize.png')
		this.load.image('home_marker','assets/Icons/house.png')

		//level 1 preload
		this.load.image('background-level1', 'assets/background/night_forest.png');
		this.load.image('resource1', 'assets/Icons/resource_icon.png');
		this.load.image('wand', 'assets/Icons/newand.png')

		//inventory preload
		this.load.image('inventoryBackground', 'assets/background_inventory.png');

		//crafting preload
		this.load.image('background-level1', 'assets/background/night_forest.png');
		this.load.image('background-spells', 'assets/background/spellbackground.png');
		this.load.image('waterIcon', 'assets/Icons/waterIcon.png');
		this.load.image('airIcon', 'assets/Icons/airIcon.png');
		this.load.image('fireIcon', 'assets/Icons/fireIcon.png');

		//combat preload
		// load spritesheets
		this.load.spritesheet('player', 'assets/player.png',
		{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('dragon', 'assets/enemies/dragon.png',
		{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('darkSpell', 'assets/spells/darkSkull.png',
		{frameWidth: 40, frameHeight: 32})
		// load images
		this.load.image('bg', 'assets/background/dark_forest.png')
		this.load.image('run_away_icon', 'assets/Icons/run_away.png');
		this.load.image('button', 'assets/Icons/Inventory_Icon.png');

		//waterSpell images
		this.load.image('background-waterspell', 'assets/background/waterSpell_Background.png')
		
		//load image for start screen here - craftSpell
		this.load.image('background-craftSpells', 'assets/background/magicshop_bakground.png');
		this.load.image('loopIcon', 'assets/Icons/loopIcon.png');
		this.load.image('starIcon', 'assets/Icons/stars-craft.png');

	}

	create() {
		this.scene.start('start')
		console.log('started main scene')
	}
}