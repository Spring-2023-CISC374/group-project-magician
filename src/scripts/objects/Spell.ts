import Phaser from 'phaser'

export default class Spell extends Phaser.Physics.Arcade.Sprite {
    // source: https://programmingmind.net/phaser/fun-with-spells-using-phaser
    
  
    constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
        super(scene, x, y, key)
    
    
      this.create()
  }

  preload() {
    // spritesheet
  }
  create() {
    this
      .setActive(false)
      .setVisible(false)
      .setCollideWorldBounds(true)
  }
  update() {
    this.setX(this.x + 1)
  }

  castSpell() {
    if(!this.active) return false;
    this.active = false;
    return true
  }
}
