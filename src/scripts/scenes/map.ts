import Phaser from 'phaser'
import MainCharacter from "../objects/MainCharacter"
import Inventory_Items from '../objects/Inventory_Items'

export default class map extends Phaser.Scene {
	private player?: MainCharacter
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	protected inventory!: Inventory_Items
	
	constructor() {
		super('map')
	}
	init(data: any) {
		this.inventory = data.inventory_items;
	}

	preload() { 
		//
	}

	create() {		
		this.add.image(400, 300, 'overworld');

		const level_1_marker = this.physics.add.image(400,400,'level_1_marker')
		const home_marker = this.physics.add.image(75,530,'home_marker')

		this.player = new MainCharacter(this, 80, 450, 100)
		this.player.handleAnims()
		this.player.anims.play('idle', true)

		this.cursors = this.input.keyboard.createCursorKeys()

		this.player.handleMapCollision(this.player, level_1_marker, 'map', 'level_1', this.inventory)
		this.player.handleMapCollision(this.player, home_marker, 'map', 'home', this.inventory)
	}
	
	update() {
		if (!this.player || !this.cursors) {
			return
		}
		this.player.handleMoving(this.player, this.cursors);
	}
}
