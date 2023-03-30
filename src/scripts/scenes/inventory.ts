import Phaser from 'phaser'

export default class inventory extends Phaser.Scene {
	//private count = 0
	//private countText?: Phaser.GameObjects.Text

	constructor() {
		super('inventory')
	}

	preload() {
		//load image for inventory screen + button
		this.load.image('inventoryBackground', 'assets/background_inventory.png');
		this.load.image('button', 'assets/inventory-bag.png');
	}

	create() {	
		this.add.image(400, 400, 'inventoryBackground')	

        this.add.text(10, 20, 'Currently on Inventory \nPress Enter to go back to Combat', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.text(10, 150, 'Red Berries: ', {
			fontSize: '20px',
			color: '#ffffff'
		})

		this.add.text(160, 150, 'count: 0', { 
			fontSize: '20px' })

		this.add.text(10, 250, 'Blue Berries: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.add.text(170, 250, 'count: 0', { 
			fontSize: '20px' })

		this.add.text(10, 350, 'Green Berries: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.add.text(180, 350, 'count: 0', { 
			fontSize: '20px' })

		this.add.text(10, 450, 'Yellow Berries: ', {
			fontSize: '20px',
			color: '#ffffff'
		})
		this.add.text(190, 450, 'count: 0', { 
			fontSize: '20px' })

        //this.input.on('pointerup', () => {
        //    this.scene.stop('inventory')
        //    this.scene.start('home')
		//})

		//button
		const button = this.add.sprite(25, 565, 'button')
		button.setInteractive()
		this.input.keyboard.on('keydown-ENTER', () => {
			this.scene.stop('inventory')
			this.scene.start('combat_1')
		})
	}

	update() {
		//
	}

}