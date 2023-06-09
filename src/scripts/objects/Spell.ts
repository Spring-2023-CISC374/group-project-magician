import Phaser from 'phaser'
import Enemy from "./Enemy"
import MainCharacter from "./MainCharacter";
import EnemyAttack from "./EnemyAttack";

export default class Spell extends Phaser.Physics.Arcade.Sprite {
  private disabled: boolean
  private spellDamage: number
  public name: string
  private clickInfo!: Phaser.GameObjects.Text 
  private cantClick: boolean
  public is_looping: boolean
    // source: https://programmingmind.net/phaser/fun-with-spells-using-phaser
    
  
    constructor(scene: Phaser.Scene, x: number, y: number, key: string, newName: string, newDamage: number, looping: boolean) {
        super(scene, x, y, key)
        this.disabled = false;
        this.spellDamage = newDamage;
        this.name = newName
        this.cantClick = false;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.is_looping = looping

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
    this.setX(this.x + 2.5)
  }
  handleSpell(player: MainCharacter, enemy: Enemy, attack: EnemyAttack) {
		this.disableBody(true, true);
    this.disabled = true;
		enemy.handleCharacterAttacked(player, this, attack)
	}
  resetSpellPosition(player: MainCharacter) {
		this.enableBody(true, player.x + 30, player.y, true, false)
		this.setActive(false)
		this.disabled = false;
	}
  checkForOverlap(player: MainCharacter, enemy: Enemy, attack: EnemyAttack) {
    this.scene.physics.add.overlap(enemy, this,
			() => this?.handleSpell(player, enemy, attack), undefined, this)
  }
  checkEndTest(player: MainCharacter, enemy: Enemy) { // used to handle the spell testing in the crafting. same as Check For Overlap
    this.scene.physics.add.overlap(enemy, this,
			() => this?.handleEndTest(player, enemy), undefined, this)
  }

  handleEndTest(player: MainCharacter, enemy: Enemy) { // used to handle the spell. Same as handle spell minus the handler for the enemy being attacked
    player
    enemy
		this.disableBody(true, true);
    this.disabled = true;
  }

  handleSpellAnims() {
    this.anims.create({
        key: 'dark_spell', 
        frames: this.anims.generateFrameNumbers('darkSpell', {
            start: 0, end: 6
        }), 
        frameRate: 10, repeat: -1
    })
    this.anims.create({
        key: 'fire_spell', 
        frames: this.anims.generateFrameNumbers('fireSpell', {
            start: 0, end: 3
        }), 
        frameRate: 10, repeat: -1
    })
    this.anims.create({
        key: 'ice_spell', 
        frames: this.anims.generateFrameNumbers('iceSpell', {
            start: 0, end: 9
        }), 
        frameRate: 10, repeat: -1
    })
    this.anims.create({
      key: 'water_spell', 
      frames: this.anims.generateFrameNumbers('waterSpell', {
          start: 0, end: 11
      }), 
      frameRate: 10, repeat: -1
  })
  this.anims.create({
    key: 'wind_spell', 
    frames: this.anims.generateFrameNumbers('windSpell', {
        start: 0, end: 5
    }), 
    frameRate: 10, repeat: -1
})
  }
  displayOnClick(player: MainCharacter, enemy: Enemy, enemyAttack: EnemyAttack) {
    if (this.cantClick === false) {
      this.cantClick = true;
    if (this.active==false && player.getNoMoreText() === true
		&& enemy.getNoMoreText() === true && enemyAttack.active === false) {
      this.clickInfo = this.scene.add.text(10, 410, "You Chose: " + this.name, {
        fontSize: '22px',
        color: '#ffffff',
        fontStyle: "bold"
      })
    }
  }

    this.clickInfo.setVisible(true);
    setTimeout(()=> {
			this.clickInfo.setVisible(false)
      this.cantClick = false;
		}, 2000)	
  }
  getCantClick() {
    return this.cantClick
  }
}
