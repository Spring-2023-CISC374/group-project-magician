//import Phaser from 'phaser'
import CommonLevel from './CommonLevel'

export default class start extends CommonLevel {
	constructor() {
		super('start')
	}

	preload() {
		//load image  for start screen here
	}

	create() {		

    this.add.text(175, 250, 'Currently at Start \n Click for Home', {
			fontSize: '40px',
			color: '#ffffff'
		})

    this.input.on('pointerup', () => {
        this.scene.stop('start')
        this.scene.start('home')
	})
	this.blueGems = 0
	this.redGems = 0
	this.yellowGems = 0
	this.greenGems = 0
	this.currentHealth = 100
	}
	

	update() {
		//
	}
}