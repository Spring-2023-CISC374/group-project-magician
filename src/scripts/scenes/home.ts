import CommonLevel from './CommonLevel'

export default class home extends CommonLevel {
	
	constructor() {
		super('home')
	}

    create() {  
        this.physics.add.image(450, 300, 'home_Background').setScale(1.555)
        const home_marker = this.physics.add.image(500,400,'house')
            .setScale(0.5)
		console.log(home_marker) // to remove warning until implementation
        super.createInformation()
        super.createButtons(this.scene.scene)
		this.add.text(this.cameras.main.width/2, 200, "Click MAP icon for the Map\n" + 
			"Click CHEST icon for Inventory\n")
			.setColor('white').setFontSize(30).setDepth(1).setOrigin(0.5)
		// code for this taken from blog.ourcase.co
        this.createEmitter("petal"); 
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