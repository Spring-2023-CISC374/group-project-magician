import Phaser from 'phaser'
import CommonLevel from './CommonLevel'
import MainCharacter from '../objects/MainCharacter'
import Enemy from '../objects/Enemy'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class level_1 extends CommonLevel {
	private player?: MainCharacter
	private enemy?: Enemy
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

	constructor() { super('level_1') }
  

	create() {		
    const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'background-level1')
		bg.setScale(
			this.cameras.main.width/(1.0005 * bg.width), this.cameras.main.height/(1.0005 * bg.height))

		super.createInformation()
		super.createButtons(this.scene.scene)

		this.add.text(this.cameras.main.width/2, 200, 'Click HAND icon to collect resources\n' +
			'Click WAND icon to craft spells\n')
			.setColor('white').setFontSize(30).setDepth(1).setOrigin(0.5)
		// resource button
		this.add.existing(new Click_Change_Scene(this, 50, 400, 'resource1', () => {				
			this.scene.start('resource', {inventory_items: this.inventory, prev_scene: this.scene.key})
			this.scene.stop('level_1')
		}));
		// wand button
		this.add.existing(new Click_Change_Scene(this, 50, 500, 'wand', () => {		    			
			this.scene.start('craftSpells', {inventory_items: this.inventory, prev_scene: this.scene.key})
			this.scene.stop('level_1')
		}));

		this.enemy = this.createEnemy()
		this.player = this.createPlayer()
		this.cursors = this.input.keyboard.createCursorKeys()
		
		// enemy collision
		this.player.handleEnemyCollision(this.player, this.enemy, 'level_1', 'combat_1', this.inventory)  
	}

	update() {
		if (!this.player || !this.cursors) { return }
		this.player.handleMoving(this.player, this.cursors);
	}
}