import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class CommonLevel extends Phaser.Scene {
	private currentHealth?: number
	private blueGems = 0
	private redGems = 0
	private yellowGems = 0
	private greenGems = 0

	constructor(key: any) {
		super(key)
	}

	preload() {
		//
	}
	create() {
		//
	}
	update() {
		//
	}
    createInformation() {
        this.add.text(20, 40, 'Currently at ' + this.scene.key + 
        '\nPress the Map Icon to go to map\nPress the Chest Icon to go to your inventory', {
			fontSize: '28px',
			color: '#ffffff'
		})
    }
	createButtons(currentScene: Phaser.Scene) {
		this.add.existing(new Click_Change_Scene(this, 50, 200, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop(currentScene)
		}));
        this.add.existing(new Click_Change_Scene(this, 50, 300, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory', {prev_scene: "level_1", 
				blueGemsCollected: this.blueGems, 
				redGemsCollected: this.redGems, 
				yellowGemsCollected: this.yellowGems, 
				greenGemsCollected: this.greenGems})

			this.scene.stop(currentScene)
		}));
	}
}