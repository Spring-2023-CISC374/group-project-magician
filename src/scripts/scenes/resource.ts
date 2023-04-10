import Phaser from 'phaser'
import MainCharacter from "../objects/MainCharacter"
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class map extends Phaser.Scene {
    private player?: MainCharacter
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private platform?: Phaser.Physics.Arcade.StaticGroup
    private star?: Phaser.Physics.Arcade.Group
    private bluescore = 0
	private bluescoreText?: Phaser.GameObjects.Text
	private gameOverText?: Phaser.GameObjects.Text
	private bomb?: Phaser.Physics.Arcade.Group
	private gameOver = false
	
    constructor() {
		super('resource')
	}

	preload() {
		//load image  for start screen here
        this.load.image('background-level1', 'assets/background/night_forest.png');
        this.load.image('ground', 'assets/Icons/platform.png');
        this.load.image('gem', 'assets/resource/bluegem.png');
        this.load.image('backbutton', 'assets/Icons/backbutton.png');
		this.load.image('bomb', 'assets/Icons/bomb.png' );
        
	}

	create() {
        //creating background image		
        const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-level1')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))

        //Telling location
        this.add.text(10, 40, 'Currently at Resource \nPress Map Icon to go to Map\nPress Inventory Icon to go to Inventory\nCollect as many resources as possible', {
			fontSize: '32px',
			color: '#ffffff'
		})
        

        //creating platform 
        this.platform = this.physics.add.staticGroup()
		this.platform.create(400, 568, 'ground').setScale(2).refreshBody()
		this.platform.create(600, 400, 'ground');
		this.platform.create(750, 250, 'ground');
        this.platform.create(-25, 300, 'ground');

        //adding the buttons to go to different scenes
        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('resource')
		}));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory')
			this.scene.stop('resource')
		}));

        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {		// back button
			this.scene.start('level_1')
			this.scene.stop('resource')
		}));

        //Adding the character
        this.player = new MainCharacter(this, 80, 510)
        this.physics.add.existing(this.player)

        this.player.setBounce(0.2)
		this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.platform)
		this.cursors = this.input.keyboard.createCursorKeys()
        this.physics.world.gravity.y = 3000;

        //adding the gems - blue only now
        this.star = this.physics.add.group(
			{
				key: 'gem',
				repeat: 10,
				setXY: { x: 12, y: 0, stepX: 70}
			}
		)

		this.star.children.iterate(c => {
			const child = c as Phaser.Physics.Arcade.Image
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
			child.setCollideWorldBounds(true);
			child.setGravityY(10);

		})
        
		this.physics.add.collider(this.star, this.platform)
		this.physics.add.overlap(this.player, this.star, this.handleCollectStar, undefined, this)
		this.bluescoreText = this.add.text(400, 10, 'Blue Gems Collected: 0', { 
			fontSize: '30px' })

		this.gameOverText = this.add.text(450, 300, 'Game Over\nPlease Click\nthe Back Button\nto go to Level 1', { 
			fontSize: '30px' })

		this.gameOverText.setOrigin(0.5)
		this.gameOverText.visible = false
		

		this.bomb = this.physics.add.group()

		this.physics.add.collider(this.bomb, this.platform)
		this.physics.add.collider(this.player, this.bomb, this.handleHitBomb, undefined, this)
	}

	private handleHitBomb(player: Phaser.GameObjects.GameObject, b:Phaser.GameObjects.GameObject){
		this.physics.pause()
		this.player?.setTint(0xff0000)
		this.player?.anims.play('turn')
		this.gameOver = true
		this.gameOverText.visible = true


	}
	
    private handleCollectStar(player: Phaser.GameObjects.GameObject, s:Phaser.GameObjects.GameObject){
		const newstar = s as Phaser.Physics.Arcade.Image
		newstar.disableBody(true, true)

		this.bluescore += 2
		this.bluescoreText?.setText('Blue Gems Collected:' + this.bluescore)

		if(this.star?.countActive(true) === 0){
			this.star.children.iterate(c => {
				const child = c as Phaser.Physics.Arcade.Image
				child.enableBody(true, child.x, 0, true, true)

			})

			if(this.player){
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

	update() {
		//this.handleMoving(); 
		if (!this.player || !this.cursors) {
			return
		}
		this.player.handleMoving(this.player, this.cursors);
	}
}
