import Phaser from 'phaser'
import combat_1 from './scenes/combat_1'


import home from './scenes/home'
import inventory from './scenes/inventory'
import level_1 from './scenes/level_1'
import map from './scenes/map'
import start from './scenes/start'
import preload from './scenes/preload'
import resource from './scenes/resource'


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		},
	},
	scene: [preload, start, home, map, level_1, combat_1, inventory,resource],
}

export default new Phaser.Game(config) 
