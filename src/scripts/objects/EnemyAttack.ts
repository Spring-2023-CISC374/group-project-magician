import Phaser from 'phaser'
import MainCharacter from "./MainCharacter";
import Enemy from './Enemy';

export default class Attack extends Phaser.Physics.Arcade.Sprite {
  private disabled: boolean
  private attackDamage: number
  public attackName: string
  
  constructor(scene: Phaser.Scene, x: number, y: number, key: string, newattackName: string, newDamage: number) {
    super(scene, x, y, key)
    this.disabled = false;
    this.attackDamage = newDamage;
    this.attackName = newattackName
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setActive(false)
    this.setVisible(false)
    this.setCollideWorldBounds(true)
}

  isDisabled() {
    return this.disabled
  }
  setDisabled(flag: boolean) {
    this.disabled = flag;
  }
  getattackName() {
    return this.attackName;
  }
  setNewattackName(newattackName: string) {
    this.attackName = newattackName;
  }
  getattackDamage() {
    return this.attackDamage;
  }
  setattackDamage(newDamage: number) {
    this.attackDamage = newDamage;
  }
  moveAttack() {
    this.setX(this.x - 2.5)
  }
  handleAttack(player: MainCharacter) {
    player.setHealth(player.getHealth() - this.attackDamage)
    this.disableBody(true, true);
    this.disabled = true;
}
  resetAttackPosition(enemy: Enemy) {
		this.enableBody(true, 370, enemy.y, true, false)
		this.setActive(false)
		this.disabled = false;
	}
  checkForOverlap(player: MainCharacter, enemy: Enemy) {
    this.scene.physics.add.overlap(player, this,
			() => {this?.handleAttack(player)
      player?.handleBeingAttacked(enemy)}
      ,undefined, this)
  }

  handleAttackAnims() {
    this.anims.create({
        key: 'dragon_attack',
        frames: this.anims.generateFrameNumbers('dragonAttack', {
            start: 0, end: 7
        }),
        frameRate: 5, repeat: -1
    })
  }
}
