import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene'

export default class home extends Phaser.Scene {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	
	constructor() {
		super('home')
	}

	create() {	
		this.physics.add.image(450, 300, 'home_Background').setScale(1.455)
		const home_marker = this.physics.add.image(500,400,'home_marker')

		this.createEmitter("petal"); // cpde for this taken from blog.ourcase.co

		this.add.existing(new Click_Change_Scene(this, 600, 50, 'map_marker', () => {			// create button to go to map
			this.scene.start('map')											
			this.scene.stop('home')
		}));

		this.add.existing(new Click_Change_Scene(this, 700, 50, 'inventory_icon', () => {		// enter inventory
			this.scene.start('inventory') 
			this.scene.stop('level_1')
		}));

		home_marker.setScale(2)

        this.add.text(0, 40, 'Currently at Home \n Press the Map Icon to go to Map', {
			fontSize: '32px',
			color: '#ffffff'
		})
		
	}

	private createEmitter(textureName: string)
	{
		const particles = this.add.particles(textureName)

        const emitter = particles.createEmitter({
            x: {min: 0, max: 1000},
			y: -5,
			lifespan: 7000,
			speedX: {min: -5, max: -100},
			tint: 0x550000,
			speedY: {min: 25, max: 100},
			scale: {start: .75, end:.25},
			blendMode: 'ADD',
			rotate: { min: -180, max: 180 },
			quantity: .25
		})	

		return emitter
	}
}