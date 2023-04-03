import Phaser from 'phaser'

export default class level_1 extends Phaser.Scene {
	constructor() {
		super('level_1')
	}

	preload() {
		//load image  for start screen here 
		//this.load.image('soil4', 'assets/background/soil4.png')
		this.load.image('inventory_icon', 'assets/Icons/Inventory_Icon.png')	// inventory Icon
		this.load.image('map_marker','assets/Icons/map.png')					// map market
		this.load.image('go','assets/Icons/Pink_1.png')					// dragon
	}

	create() {		
		//this.add.image(400, 300, 'soil4').setScale(3.5);
		const inventory_icon = this.add.image(50, 50, 'inventory_icon').setInteractive()
		const map_marker = this.physics.add.image(300,400,'map_marker').setInteractive()
		const enemy = this.physics.add.image(200,300,'go ').setInteractive()

        this.add.text(0, 40, 'Currently at level 1 \n Click pink 1 for combat_1 \n Click chest for inventory \n Click map icon for map', {
			fontSize: '32px',
			color: '#ffffff'
		})

		map_marker.on('pointerout', () => {
            this.scene.stop('level_1')
            this.scene.start('map')
		})

        inventory_icon.on('pointerout', () => {
            this.scene.pause('level_1')
            this.scene.start('inventory')
		})
		enemy.on('pointerout', () => {
            this.scene.pause('level_1')
            this.scene.start('combat_1')
		})
	}
	

	update() {
		//
	}

}