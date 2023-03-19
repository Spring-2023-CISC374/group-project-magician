import Phaser from 'phaser'

import startScene from './scenes/start'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		},
	},
	scene: [startScene],
}

export default new Phaser.Game(config)
