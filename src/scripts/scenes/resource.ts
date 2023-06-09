import Phaser from 'phaser'
import MainCharacter from "../objects/MainCharacter"
import Click_Change_Scene from '../objects/Click_Change_Scene'
import CommonLevel from './CommonLevel'
import Inventory_Items from '../objects/Inventory_Items'

export default class resource extends CommonLevel {
    private player?: MainCharacter
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private platform?: Phaser.Physics.Arcade.StaticGroup
    private gem?: Phaser.Physics.Arcade.Group
	private bluescoreText?: Phaser.GameObjects.Text
	private gameOverText?: any
	private bomb?: Phaser.Physics.Arcade.Group
	protected gameOver: boolean
	private GemsCollected: number	
	private gem_index: number						// this will allow us to add the correct numer of gems in the correct place in the array
	protected inventory_items!: Inventory_Items

    constructor() {
		super('resource')
		this.GemsCollected = 0
		this.gem_index = -1 						// no value determined yet
		this.gameOver = false
	}
	
	init (data: any) {
		console.log('init', data)
		this.currentHealth = data.storedHealth
		this.inventory_items = data.inventory_items
	}

	preload() {
        this.load.image('background-level1', 'assets/background/night_forest.png');
        this.load.image('ground', 'assets/Icons/platform.png');
        this.load.image('backbutton', 'assets/Icons/backbutton.png');
		this.load.image('bomb', 'assets/Icons/bomb.png' );
	}

	create() {
		this.gameOver = false
        
		// creating background image
        const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-level1')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))

        // telling location
		super.createInformation()
		this.add.text(20, 115, 'Press the back button to go back to level 1\nCollect as many resources as possible', {
			fontSize: '28px',
			color: '#ffffff'
		})
        
        // creating platform 
        this.platform = this.physics.add.staticGroup()
		this.platform.create(400, 568, 'ground').setScale(2).refreshBody()
		this.platform.create(600, 400, 'ground');
		this.platform.create(750, 250, 'ground');
        this.platform.create(-25, 300, 'ground');

        // adding the character
        this.player = new MainCharacter(this, 80, 480,this.currentHealth)
		this.player.handleAnims()
		this.player.anims.play('idle', true)
        this.physics.add.existing(this.player)

        this.player.setBounce(0.2)
		this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platform)
		this.cursors = this.input.keyboard.createCursorKeys()
        this.physics.world.gravity.y = 300;

		// adding a bomb to make it diffcult 
		this.bomb = this.physics.add.group()

		this.physics.add.collider(this.bomb, this.platform)
		this.physics.add.collider(this.player, this.bomb, this.handleHitBomb, undefined, this)

        // adding the gems - could be any different type
		// select the gem type 
		const gem_type = this.select_gem_type() // function will randomly select the type of gem that will spawn
		this.get_gem_index(gem_type);

        this.gem = this.physics.add.group({
			key: gem_type,
			repeat: 10,
			setXY: { x: 12, y: 0, stepX: 70}
		})

		this.gem.children.iterate(c => {
			const child = c as Phaser.Physics.Arcade.Image
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
			child.setCollideWorldBounds(true);
			child.setGravityY(10);
		})
        
		// Initialize gem collected here
		this.GemsCollected = 0;

		this.physics.add.collider(this.gem, this.platform)
		this.physics.add.overlap(this.player, this.gem, this.handleCollectStar, undefined, this)
		this.bluescoreText = this.add.text(500, 10, 'Gems Collected: 0', { 
			fontSize: '24px' })

		this.gameOverText = this.add.text(425, 300, 'Game Over\nPlease Click\nthe Back Button\nto go to Level 1', { 
			fontSize: '30px' })

		this.gameOverText.setOrigin(0.5)
		this.gameOverText.visible = false

		//adding the buttons to go to different scenes
        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {			// create button to go to map
			this.add_Collected_Gems()
			this.scene.start('map', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth})											
			this.scene.stop('resource')
		}));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {		// inventory button
			this.add_Collected_Gems()
			this.scene.start('inventory',  {prev_scene: "resource", 
				storedHealth: this.currentHealth, inventory_items: this.inventory_items})
			this.scene.stop('resource')
		}));

        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {		// back button
			this.add_Collected_Gems()
			this.scene.start('level_1', {prev_scene: "resource", 
				storedHealth: this.currentHealth, inventory_items: this.inventory_items})
			
			this.scene.stop('resource')
		}));
	}

	private handleHitBomb() {
		// make the player fly off the screen
		this.physics.pause()
		// make the bomb explode
		this.player?.anims.pause()
		this.player?.setTint(0x00000)
		this.gameOver = true
		// set the gems collected to 0 because you were hit
		this.GemsCollected = 0 				
		this.gameOverText.visible = true
	}
	
    private handleCollectStar(player: Phaser.GameObjects.GameObject, s:Phaser.GameObjects.GameObject){
		// make the player have a sparkle animation
		player; // used to get rid of yellow squiggles
		const newstar = s as Phaser.Physics.Arcade.Image
		newstar.disableBody(true, true)

		this.GemsCollected = this.GemsCollected + 2

		this.bluescoreText?.setText('Gems Collected:' + this.GemsCollected)

		if(this.gem?.countActive(true) === 0){
			this.gem.children.iterate(c => {
				const child = c as Phaser.Physics.Arcade.Image
				child.enableBody(true, child.x, 0, true, true)
			})

			if (this.player){
			const x = this.player.x < 400
			? Phaser.Math.Between(400, 800)
			: Phaser.Math.Between(0, 400)

			const bomb: Phaser.Physics.Arcade.Image = this.bomb?.create(x, 16, 'bomb')
			bomb.setBounce(1)
			bomb.setCollideWorldBounds(true)
			bomb.setVelocityY(Phaser.Math.Between(-200, 200))
			}
		}
	}

	private add_Collected_Gems() {
		if (this.gem_index == 0) {
			this.inventory_items.blueGems = this.GemsCollected + this.inventory_items.blueGems;
		} else if (this.gem_index == 1) {
			this.inventory_items.redGems = this.GemsCollected + this.inventory_items.redGems;
		} else if (this.gem_index == 2) {
			this.inventory_items.yellowGems = this.GemsCollected + this.inventory_items.yellowGems;
		} else {
			this.inventory_items.greenGems = this.GemsCollected + this.inventory_items.greenGems;
		}
	}
	private select_gem_type(): string {
		let gem_type = ""
		const gem_seed = Math.random() % 100 // random number that determines what our gem type will be 

		if (gem_seed < 0.3) {
			gem_type = "blue-gem"
		} else if (gem_seed < 0.6) {
			gem_type = "red-gem"
		} else if (gem_seed < 0.9) {
			gem_type = "yellow-gem"
		} else { 
			gem_type = "green-gem"
		}
		return gem_type
	}

	private get_gem_index(gem_type: string) {
		if (gem_type == "blue-gem") {
			this.gem_index = 0
		} else if (gem_type == "red-gem") {
			this.gem_index = 1
		} else if (gem_type == "yellow-gem") {
			this.gem_index = 2
		} else { 
			this.gem_index = 3
		}
	}

	update() {
		if (!this.player || !this.cursors) { return }
		this.player.levelhandleMoving(this.player, this.cursors);
	}
}
