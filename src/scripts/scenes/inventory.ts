import Phaser from 'phaser'

export default class inventory extends Phaser.Scene {
	//private count = 0
	//private countText?: Phaser.GameObjects.Text


	constructor() {
		super('inventory')
	}

	preload() {
		this.load.image('inventoryBackground', 'assets/background_inventory.png');
		//load image  for start screen here
	}

	create() {	
		this.add.image(400, 400, 'inventoryBackground')	
		const exit_icon = this.add.image(100, 100, 'exit_icon')

		exit_icon.setInteractive().on('pointerout', () => {
			this.scene.stop('inventory')
			this.scene.start('level_1')
		})

        this.add.text(10, 40, 'Currently on inventory \n Click X to return to level', {
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
	}
	//commented out count and count text, removed this.countText = this.add.text from 4 lines.

	update() {
		//
	}

}