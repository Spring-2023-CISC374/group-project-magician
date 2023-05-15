
//import Phaser from 'phaser'
//import MainCharacter from '../objects/MainCharacter';
//import Enemy from '../objects/Enemy';
//import Spell from '../objects/Spell'
//import SpellButtons from '../objects/SpellButtons'

import CommonCombat from "./CommonCombat"
export default class combat_1 extends CommonCombat {
	constructor() { super('combat_1') }

	preload() {
		//
	}

	create() {
		const bg = this.add.image(
			this.cameras.main.width/2, this.cameras.main.height/2, 'bg')
		bg.setScale(
			this.cameras.main.width/bg.width, this.cameras.main.height/bg.height)	
		super.createEnemy(400, 525, 'dragon', 80, 10)
		super.makeInitialStatusEffect('movingFire2')
		this.anims.create({
			key: 'moving_fire', 
			frames: this.anims.generateFrameNumbers('movingFire2', {
				start: 0, end: 5
			}), 
			frameRate: 7, repeat: -1
		})
		this.statusEffect.anims.play('moving_fire', true)
		super.create()
		console.log(this.enemy)
    }

	update() {
		super.update()
	}
}
