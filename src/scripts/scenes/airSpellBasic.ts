import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';
import Spell from '../objects/Spell';
import Enemy from '../objects/Enemy';
import MainCharacter from '../objects/MainCharacter';


export default class airSpellBasic extends Phaser.Scene {
    //private blueGemsCollected!: number;
    private craftPotCount!: number;
    protected inventory!: Inventory_Items;
    protected currentHealth!: number;
    protected spell!: Spell;
    protected enemy!: Enemy;
    protected player!: MainCharacter;
    protected keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    protected craftPot:any;

    
	constructor() {
		super('airSpellBasic')
        this.craftPotCount = 2;
        
	}

    init(data: any) {
        console.log('airSpell', data);
        this.currentHealth = data.storedHealth;
        this.inventory = data.inventory_items;
    }

    createInformation() {
        this.add.image(this.cameras.main.width/2, 50, 'text_banner').setScale(4);
        this.add.text(this.cameras.main.width/2, 50, this.scene.key.toUpperCase())
            .setColor('black').setFontSize(30).setDepth(1).setOrigin(0.5);
    }

      
	create() {	
		//making background
        //this.add.image(400, 400, 'background-waterspell')
        const bg = this.add.image(
            this.cameras.main.width/2, this.cameras.main.height/2, 'background-airspell');
       bg.setScale(
           this.cameras.main.width/(0.5 * bg.width), this.cameras.main.height/(0.5 * bg.height));

       
        this.createInformation()

        this.createPlayer(80, 515, this.currentHealth) // creating a player
        this.createEnemy(400, 525, 'yellow-gem', 20, 5) // creating a gen the spell will hit
        this.createEnemy(425, 525, 'green-gem', 20, 5) // creating a gen the spell will hit

        this.spell = new Spell(this, this.player.x + 30, this.player.y, 'windSpell',"Air Spell", 8, true) // ICE Spell Temporarily
        this.spell.handleSpellAnims() // water spell will be 
        this.spell.setDisabled(false)
        this.spell.setActive(false)
        
        this.keys = this.input.keyboard.createCursorKeys(); // activating keyboard

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('basicSpell',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('airSpellBasic');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('airSpellBasic');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {        // inventory button
            this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('airSpellBasic');
        }));

        //telling how to make loop
        this.add.text(20, 125, 'You need to use 1 Green Gem and 1 Yellow Gem\nto make this Spell\n\nDrag the number of Yellow and Green Gems you\nwant to use to make the Air Spell into the\ncauldron', {
            fontSize: '26px',
            color: '#ffffff',
        });

       //new idea
          //  making visual aid for gems - drag in drop for basic spell
          const countText = this.add.text(20, 425, `You now have ${this.craftPotCount} Basic Air Spells.\nThey are now in your inventory`, {
            fontSize: '22px',
            color: '#ffffff',
          });

          const newText = this.add.text(50, 350, `You have ${this.inventory.yellowGems} Yellow Gems`, {
            fontSize: '18px',
            color: '#ffffff',
          });
          
          const newTextGreen = this.add.text(50, 375, `You have ${this.inventory.greenGems} Green Gems`, {
            fontSize: '18px',
            color: '#ffffff',
          });
          
          const frames = this.textures.get('yellow-gem').getFrameNames();

          const x = 100;
          const y = 325;
  
          for (let i = 0; i < this.inventory.yellowGems; i++)
          {
              const image = this.add.image(x, y, 'yellow-gem', Phaser.Math.RND.pick(frames)).setInteractive({ draggable: true });
  
              x; 
              y;

              this.craftPot = this.physics.add.image(700, 300, 'craftPot')
             
              this.physics.add.existing(image);
              this.physics.add.existing(this.craftPot);

              this.physics.add.collider(image, this.craftPot, () => {
                image.destroy();
                this.inventory.yellowGems -= 1;
                if(this.inventory.yellowGems == this.inventory.greenGems){
                    this.craftPotCount++;
                }else{
                    this.craftPotCount;
                }
                this.inventory.basicAirSpell = this.craftPotCount;
                countText.setText(`You now have ${this.craftPotCount} Basic Air Spells.\nThey are now in your inventory`);
                newText.setText(`You have ${this.inventory.yellowGems} Yellow Gems`);
            });         
          }
            
          this.input.on('dragstart',  (pointer:any, gameObject:any) =>
          {
  
              this.children.bringToTop(gameObject);
  
          }, this);
  
          this.input.on('drag', (pointer: any, gameObject: any, dragX: number, dragY: number) =>
          {
  
              gameObject.x = dragX;
              gameObject.y = dragY;
  
          });

          const framesGreen = this.textures.get('green-gem').getFrameNames();

          const x1 = 250;
          const y1 = 325;
  
          for (let i = 0; i < this.inventory.greenGems; i++)
          {
              const imageGreen = this.add.image(x1, y1, 'green-gem', Phaser.Math.RND.pick(framesGreen)).setInteractive({ draggable: true });
  
              x1; 
              y1;

              this.craftPot = this.physics.add.image(700, 300, 'craftPot')
             
              this.physics.add.existing(imageGreen);
              this.physics.add.existing(this.craftPot);

              this.physics.add.collider(imageGreen, this.craftPot, () => {
                imageGreen.destroy();
                this.inventory.greenGems -= 1;
                if(this.inventory.yellowGems == this.inventory.greenGems){
                    this.craftPotCount++;
                }else{
                    this.craftPotCount;
                }
                this.inventory.basicAirSpell = this.craftPotCount;
                countText.setText(`You now have ${this.craftPotCount} Basic Air Spells.\nThey are now in your inventory`);
                newTextGreen.setText(`You have ${this.inventory.greenGems} Green Gems`);
            });         
          }
      
	}

    update() {
        
        this.spell.handleSpellAnims()

        if ( this.keys.space.isDown == true && this.spell?.active==false) { 
            console.log("spell is being tested");
			this.player.castSpell(this.player, this.spell)
		}
		if (this.spell?.active == true) {
			this.spell.moveSpell()
		}
		if (this.spell?.isDisabled() == true) {
			this.spell.resetSpellPosition(this.player)
		}
        this.spell?.checkEndTest(this.player, this.enemy) // figure out what to interact with
    }

    createPlayer(x: number, y: number, health: number) {
        this.player = new MainCharacter(this, x, y, health)
		this.player.handleAnims()
		this.player.anims.play('idle', true)
    }

    createEnemy(x: number, y: number, sprite: string, health: number, damage: number) {
        this.enemy = new Enemy(this, x, y, sprite, health, damage)
    }
}