import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'
import Inventory_Items from '../objects/Inventory_Items'

export default class CommonLevel extends Phaser.Scene {
	public inventory!: Inventory_Items
	public currentHealth!: number
	protected prev_scene!: string

	constructor(key: any) {
		super(key)
		this.prev_scene = key
	}
	init(data: any) {
		console.log("common scene = ", data);
		this.inventory = data.inventory_items
		this.prev_scene = data.prev_scene
		this.currentHealth = data.storedHealth
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
		this.add.existing(new Click_Change_Scene(this, 50, 200, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop(currentScene)
		}));
        this.add.existing(new Click_Change_Scene(this, 50, 300, 'inventory_icon', () => {		// inventory button
			this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHeath: this.currentHealth})

			this.scene.stop(currentScene)
		}));
	}
}