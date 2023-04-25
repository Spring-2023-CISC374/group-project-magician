import Phaser from 'phaser'
import Enemy from "./Enemy"
import MainCharacter from "./MainCharacter";

export default class Spell extends Phaser.Physics.Arcade.Sprite {
  private disabled: boolean
  private spellDamage: number
  public name: string
    // source: https://programmingmind.net/phaser/fun-with-spells-using-phaser
    
  
    constructor(scene: Phaser.Scene, x: number, y: number, key: string, newName: string, newDamage: number) {
        super(scene, x, y, key)
        this.disabled = false;
        this.spellDamage = newDamage;
        this.name = newName
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setActive(false)
        this.setVisible(false)
        this.setCollideWorldBounds(true)
  }

  preload() {
    // spritesheet
  }
  create() {
    //
  }
  update() {
    //this.setX(this.x + 1)
  }
  isDisabled() {
    return this.disabled
  }
  setDisabled(flag: boolean) {
    this.disabled = flag;
  }
  getName() {
    return this.name;
  }
  setNewName(newName: string) {
    this.name = newName;
  }
  getSpellDamage() {
    return this.spellDamage;
  }
  setSpellDamage(newDamage: number) {
    this.spellDamage = newDamage;
  }
  moveSpell() {
    this.setX(this.x + 2)
  }
  handleSpell(player: MainCharacter, enemy: Enemy) {
		this.disableBody(true, true);
    this.disabled = true;
		enemy.handleCharacterAttacked(player, this.spellDamage)
	}
  resetSpellPosition(player: MainCharacter) {
		this.enableBody(true, player.x + 30, player.y, true, false)
		this.setActive(false)
		this.disabled = false;
	}
  checkForOverlap(player: MainCharacter, enemy: Enemy) {
    this.scene.physics.add.overlap(enemy, this,
			() => this?.handleSpell(player, enemy), undefined, this)
  }
}
