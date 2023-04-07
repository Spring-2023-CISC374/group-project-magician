import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class level_1 extends Phaser.Scene {
	constructor() {
		super('level_1')
	}

	create() {		
		//this.add.image(400, 300, 'soil4').setScale(3.5);

        this.add.text(50, 40, 'Currently at level 1 \n Click pink 1 for combat_1 \n Click chest for inventory \n Click map icon for map', {
			fontSize: '32px',
			color: '#ffffff'
		})

		this.add.existing(new Click_Change_Scene(this, 50, 100, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('level_1')
		}));

        this.add.existing(new Click_Change_Scene(this, 50, 200, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory')
			this.scene.stop('level_1')
		}));
		this.add.existing(new Click_Change_Scene(this, 50, 300, 'go', () => {		// enter combat button
			this.scene.start('combat_1')
			this.scene.stop('level_1')
		}));
	}
	

	update() {
		//
	}

}