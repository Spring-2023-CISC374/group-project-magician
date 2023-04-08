import Phaser from 'phaser'
import MainCharacter from "../objects/MainCharacter"
export default class level_1 extends Phaser.Scene {
	private player?: MainCharacter
	private currentHealth: number
	constructor() {
		super('level_1')
	}
	init (data: any) {
		console.log('init', data)
		this.currentHealth = data.storedHealth
	}
	preload() {
		
		//this.load.image('soil4', 'assets/background/soil4.png')
	}

	create() {		
		//this.add.image(400, 300, 'soil4').setScale(3.5);
		this.player = new MainCharacter(this, 300, 300, this.currentHealth)
        this.add.text(0, 40, 'Currently at level 1 \n Click for combat_1', {
			fontSize: '32px',
			color: '#ffffff'
		})
		this.player.displayHealth()

        this.input.on('pointerup', () => {
            this.scene.stop('level_1')
            this.scene.start('combat_1')
		})
	}

	update() {
		//
	}

	
}