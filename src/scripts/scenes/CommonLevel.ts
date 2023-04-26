import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class CommonLevel extends Phaser.Scene {
	protected blueGems!: number
	protected redGems!: number
	protected yellowGems!: number
	protected greenGems!: number
	protected currentHealth!: number
	protected prev_scene!: string

	constructor(key: any) {
		super(key)
		this.prev_scene = key
	}
	init (data: any) { // data will have info about the rpevious scene, the number of gems for each type and the characters health
		console.log('init', data)
		this.currentHealth = data.storedHealth
		this.blueGems = data.blueGems
		this.redGems = data.redGems
		this.yellowGems = data.yellowGems
		this.greenGems = data.greenGems
		this.prev_scene = data.prev_scene

	}

	preload() {
		//
	}
	create() {
		//
	}
	update() {
		//n
	}
    createInformation() {
        this.add.text(20, 40, 'Currently at ' + this.scene.key + 
        '\nPress the Map Icon to go to map\nPress the Chest Icon to go to your inventory', {
			fontSize: '28px',
			color: '#ffffff'
		})
    }
	createButtons(currentScene: Phaser.Scene) {
		this.add.existing(new Click_Change_Scene(this, 50, 225, 'map_marker', () => {			// create button to go to map
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