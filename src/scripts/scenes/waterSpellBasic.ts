import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';
import Spell from '../objects/Spell';
import Enemy from '../objects/Enemy';
import MainCharacter from '../objects/MainCharacter';
//import DraggableImage from '../objects/DragImage';


export default class waterSpellBasic extends Phaser.Scene {
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
		super('waterSpellBasic')
        //this.basicWaterSpell = 0
        this.craftPotCount = 0;
        
	}

    init(data: any) {
        console.log('waterSpell', data);
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
            this.cameras.main.width/2, this.cameras.main.height/2, 'background-waterspell');
       bg.setScale(
           this.cameras.main.width/(0.5 * bg.width), this.cameras.main.height/(0.5 * bg.height));

        //telling the location
        //this.add.text(10, 40, 'Currently at Water Spell\nPress the Back Button to go to Craft\nSpell', {
        //    fontSize: '32px',
        //    color: '#ffffff'
        //});

        this.createInformation()
        //this.promptWaterSpellCount();

/*
        this.time.delayedCall(1500, () => {
            const userInput = window.prompt('Enter the number of Water Spells you want:');
    
            // Initialize gem collected here
            this.inventory.basicWaterSpell = 0;
            
            // Check if the user input is not null
            if (userInput !== null) {
            //CHeck if the user input is a vaild number
                if (parseInt(userInput) >= 0) {
                // Parse the user input as an integer
                    const numWaterSpells = parseInt(userInput);
    
                // Perform the loop based on the user input
                //let waterSpell = 0;
                    for (let i = 0; i < numWaterSpells; i++) {
                        this.blueGemsCollected -= 1;
                        this.inventory.basicWaterSpell += 1;
                    }
                this.inventory.waterSpell += this.inventory.basicWaterSpell;
                this.inventory.blueGems -= 1 * (numWaterSpells)
                this.blueGemsCollected = this.blueGemsCollected - numWaterSpells
                this.add.text(20, 400, `You now have ${this.inventory.basicWaterSpell} Water Spells.\nThey are now in your inventory`, {
                    fontSize: '28px',
                    color: '#ffffff',
                });
            } else {
                // Handle the case where the user input is not a number
                this.add.text(20, 500, 'Please enter a valid number', {
                    fontSize: '28px',
                    color: '#ffffff',
                });
                this.time.delayedCall(1500, () => {
                    const userInput = window.prompt('Enter the number of Water Spells you want:');
            
                    // Initialize gem collected here
                    this.inventory.basicWaterSpell = 0;
                    
                    // Check if the user input is not null
                    if (userInput !== null) {
                    //CHeck if the user input is a vaild number
                        if (parseInt(userInput) >= 0) {
                        // Parse the user input as an integer
                            const numWaterSpells = parseInt(userInput);
            
                        // Perform the loop based on the user input
                        //let waterSpell = 0;
                            for (let i = 0; i < numWaterSpells; i++) {
                                this.blueGemsCollected -= 1;
                                this.inventory.basicWaterSpell += 1;
                            }
                        this.inventory.waterSpell += this.inventory.basicWaterSpell;
                        this.inventory.blueGems -= 1 * (numWaterSpells)
                        this.blueGemsCollected = this.blueGemsCollected - numWaterSpells
                        this.add.text(20, 400, `You now have ${this.inventory.basicWaterSpell} Water Spells.\nThey are now in your inventory`, {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                    } else {
                        // Handle the case where the user input is not a number
                        this.add.text(20, 500, 'Please enter a valid number', {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                        
                    }
            
                    } else {
                        // Handle the case where the user input is null
                        this.add.text(20, 400, 'User canceled input dialog', {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                        //console.log('User canceled input dialog');
                    }
                    })  
                
            }
    
            } else {
                // Handle the case where the user input is null
                this.add.text(20, 400, 'User canceled input dialog', {
                    fontSize: '28px',
                    color: '#ffffff',
                });
                //console.log('User canceled input dialog');
            }
            })  
*/
        this.createPlayer(80, 515, this.currentHealth) // creating a player
        this.createEnemy(400, 525, 'blue-gem', 80, 10) // creating a gen the spell will hit

        this.spell = new Spell(this, this.player.x + 30, this.player.y, 'iceSpell',"Ice Spell", 8) // ICE Spell Temporarily
        this.spell.handleSpellAnims() // water spell will be 
        this.spell.setDisabled(false)
        this.spell.setActive(false)
        
        this.keys = this.input.keyboard.createCursorKeys(); // activating keyboard

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('basicSpell',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('waterSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('waterSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {        // inventory button
            this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('waterSpell');
        }));

        //telling how to make loop
        this.add.text(20, 150, 'You need to use 1 Blue Gem to make this Spell\n\nDrag the number of Blue Gems you want to use\nto make the Water Spell into the cauldron', {
            fontSize: '28px',
            color: '#ffffff',
        });

       // this.add.text(20,250, 'For(int i = 0; i < number; i++){\n let blueGemsCollected = blueGemsCollected - 4;\n int WaterSpell = WaterSpell + 1\n}\nreturn WaterSpell', {
        //    fontSize: '26px',
        //    color: '#ffffff',
        //});

        //new idea
          //  Create a stack of random cards
          const countText = this.add.text(20, 400, `You now have ${this.craftPotCount} Basic Water Spells.\nThey are now in your inventory`, {
            fontSize: '22px',
            color: '#ffffff',
          });

          const newText = this.add.text(50, 350, `You have ${this.inventory.blueGems} Blue Gems`, {
            fontSize: '18px',
            color: '#ffffff',
          });
          
          const frames = this.textures.get('blue-gem').getFrameNames();

          const x = 100;
          const y = 300;
  
          for (let i = 0; i < this.inventory.blueGems; i++)
          {
              const image = this.add.image(x, y, 'blue-gem', Phaser.Math.RND.pick(frames)).setInteractive({ draggable: true });
  
              x; 
              y;

              this.craftPot = this.physics.add.image(700, 300, 'craftPot')
             
              this.physics.add.existing(image);
              this.physics.add.existing(this.craftPot);

              this.physics.add.collider(image, this.craftPot, () => {
                image.destroy();
                this.craftPotCount++;
                this.inventory.blueGems -= 1;
                this.inventory.basicWaterSpell = this.craftPotCount;
                countText.setText(`You now have ${this.craftPotCount} Basic Water Spells.\nThey are now in your inventory`);
                newText.setText(`You have ${this.inventory.blueGems} Blue Gems`);
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