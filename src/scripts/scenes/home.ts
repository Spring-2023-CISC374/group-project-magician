import Phaser from 'phaser'
import CommonLevel from './CommonLevel'

export default class home extends CommonLevel {
	private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	
	constructor() {
		super('home')
	}

	init(data: any) {
		console.log("inventory scene = ", data);
		this.blueGems = this.blueGems + data.blueGemsCollected;
		this.redGems = this.redGems + data.redGemsCollected
		this.yellowGems = this.yellowGems + data.yellowGemsCollected
		this.greenGems = this.greenGems + data.greenGemsCollected
		this.prev_scene = data.prev_scene
	}

	create() {	
		this.physics.add.image(450, 300, 'home_Background').setScale(1.455)
		const home_marker = this.physics.add.image(500,400,'home_marker')
		super.createInformation()
		super.createButtons(this.scene.scene)

		home_marker.setScale(2)

		this.createEmitter("petal"); // cpde for this taken from blog.ourcase.co
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