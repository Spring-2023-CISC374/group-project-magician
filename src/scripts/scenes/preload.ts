import Phaser from 'phaser'

export default class start extends Phaser.Scene {
	constructor() { super('preload') }

	preload() {
        // loading the buttons
		this.load.image('inventory_icon', 'assets/newicons/Inventory_Icon.png')	// button to enter inventory
		this.load.image('map_marker','assets/newicons/map.png')					// button to return to map
        this.load.image('home_marker','assets/newicons/house.png')                 // button to return home
		this.load.image('house','assets/newicons/greenhouse.png')                  // button to return home
		this.load.image('exit_icon', 'assets/newicons/exit_Icon.png');             // button to exit inventory
		this.load.image('level_1_marker','assets/newicons/Pink_1.png')
		// player sprit
		this.load.spritesheet('mainChar', 'assets/player.png',
		{frameWidth: 32, frameHeight: 32})
		// enemy sprites
		this.load.spritesheet('dragon', 'assets/enemies/dragon.png',				// enemy dragon		
		{frameWidth: 32, frameHeight: 32})		
		this.load.spritesheet('dragonAttack', 'assets/enemies/dragon_attack.png',	// enemy dragon attack	
		{frameWidth: 32, frameHeight: 32})
		// fire status effect animation
		this.load.spritesheet('movingFire2', 'assets/newicons/movingFire2.png',	// enemy dragon attack	
		{frameWidth: 44, frameHeight: 70})							
		// background stuff
		this.load.image('start_background', 'assets/background/dark_forest.png')
		this.load.image('home_Background', 'assets/background/Cherry_Blossom_Background.png');
		this.load.image('text_banner', 'assets/newicons/banner.png')

		// image for inventory button
		this.load.image('button', 'assets/player.png');

		// for petal
		this.load.image('petal', "assets/petal.png");
		
		// background image for level 1
		this.load.image('background-level1', 'assets/background/night_forest.png');

		// loading gems for inventory and resource gathering
		this.load.image('blue-gem', 'assets/resource/bluegem.png');
		this.load.image('red-gem', 'assets/resource/redgem.png');
		this.load.image('yellow-gem', 'assets/resource/yellowgem.png');
		this.load.image('green-gem', 'assets/resource/greengem.png');
		// resourse preload
		this.load.image('background-level1', 'assets/background/night_forest.png');
        this.load.image('ground', 'assets/newicons/platform.png');
        this.load.image('gem', 'assets/resource/bluegem.png');
        this.load.image('backbutton', 'assets/newicons/backbutton.png');
		this.load.image('bomb', 'assets/newicons/bomb.png' );

		// map preload
		this.load.image('overworld', 'assets/background/overworldResize.png')
		this.load.image('home_marker','assets/newicons/house.png')

		// level 1 preload
		this.load.image('background-level1', 'assets/background/night_forest.png');
		this.load.image('resource1', 'assets/newicons/resource_icon.png');
		this.load.image('wand', 'assets/newicons/newand.png')

		// inventory preload
		this.load.image('inventoryBackground', 'assets/background_inventory.png');

		// crafting preload
		this.load.image('background-level1', 'assets/background/night_forest.png');
		this.load.image('background-spells', 'assets/background/spellbackground.png');
		this.load.image('waterIcon', 'assets/newicons/waterIcon.png');
		this.load.image('airIcon', 'assets/newicons/airIcon.png');
		this.load.image('fireIcon', 'assets/newicons/fireIcon.png');

		// combat preload
		// load spritesheets
		this.load.spritesheet('player', 'assets/player.png',
		{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('dragon', 'assets/enemies/dragon.png',
		{frameWidth: 32, frameHeight: 32})
		this.load.spritesheet('darkSpell', 'assets/spells/darkSkull.png',
		{frameWidth: 40, frameHeight: 32})
		// load images
		this.load.image('bg', 'assets/background/dark_forest.png')
		this.load.image('run_away_icon', 'assets/newicons/run_away.png');
		//Edited here
		this.load.image('button', 'assets/newicons/Inventory_Icon.png');
		this.load.image('flame', 'assets/newicons/smallFlame.png')
		this.load.spritesheet('fireSpell', 'assets/spells/fireBoltSheet.png', 
		{frameWidth: 48, frameHeight: 48})
		this.load.spritesheet('iceSpell', 'assets/spells/iceSpell.png', 
		{frameWidth: 48, frameHeight: 32})
		this.load.spritesheet('waterSpell', 'assets/spells/waterSpell2.png', 
		{frameWidth: 50, frameHeight: 47})
		this.load.spritesheet('windSpell', 'assets/spells/windSpell.png', 
		{frameWidth: 32, frameHeight: 32})
		//chest icon
		this.load.image('chest', 'assets/newicons/Inventory_Icon.png');

		// waterSpell images
		this.load.image('background-waterspell', 'assets/background/waterSpell_Background.png')
		this.load.image('background-airspell', 'assets/background/airSpell_Background.png')
		
		// load image for start screen here - craftSpell
		this.load.image('background-craftSpells', 'assets/background/magicshop_bakground.png');
		//Edited Here
		this.load.image('loopIcon', 'assets/newicons/loopIcon.png');
		this.load.image('starIcon', 'assets/newicons/stars-craft.png');

	}
	
	create() {
		this.scene.start('start')
		console.log('started main scene')
	}
}
