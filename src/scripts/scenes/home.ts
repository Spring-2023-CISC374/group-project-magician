import Phaser from 'phaser'
import CommonLevel from './CommonLevel'

export default class home extends CommonLevel {
	//private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
	
	constructor() {
		super('home')
	}

    create() {  
        this.physics.add.image(450, 300, 'home_Background').setScale(1.555)
        const home_marker = this.physics.add.image(500,400,'house')
            .setScale(0.5)
        super.createInformation()
        super.createButtons(this.scene.scene)

        this.createEmitter("petal"); // code for this taken from blog.ourcase.co
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