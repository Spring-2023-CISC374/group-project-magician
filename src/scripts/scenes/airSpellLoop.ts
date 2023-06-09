import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';
import Spell from '../objects/Spell';
import Enemy from '../objects/Enemy';
import MainCharacter from '../objects/MainCharacter';
//import CommonLevel from './CommonLevel'


export default class airSpell extends Phaser.Scene {
    protected inventory!: Inventory_Items
    protected currentHealth!: number
    protected spell!: Spell
    protected enemy!: Enemy
    protected player!: MainCharacter
    protected keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    protected timesCast!: number
    
	constructor() {
		super('airSpell')
        //this.airSpellLoop = 0
	}

    init (data: any) {
		console.log('airSpell', data)
		this.currentHealth = data.storedHealth
		this.inventory = data.inventory_items
	}

    createInformation() {
		this.add.image(this.cameras.main.width/2, 50, 'text_banner').setScale(4)
		this.add.text(this.cameras.main.width/2, 50, this.scene.key.toUpperCase())
			.setColor('black').setFontSize(30).setDepth(1).setOrigin(0.5)
	}
	create() {	
		//making background
        //this.add.image(400, 400, 'background-waterspell')
        const bg = this.add.image(
            this.cameras.main.width/2, this.cameras.main.height/2, 'background-airspell');
       bg.setScale(
           this.cameras.main.width/(.95 * bg.width), this.cameras.main.height/(.95 * bg.height));

        //
        this.createPlayer(100, 450, this.currentHealth) // creating a player
        this.createEnemy(500, 450, 'yellow-gem', 20, 10)
        this.createEnemy(550, 450, 'green-gem', 20, 10)
   
        this.spell = new Spell(this, this.player.x + 30, this.player.y, 'windSpell',"Air Spell", 8, true) // created water spell
        this.spell.handleSpellAnims() // water spell will be 
        this.spell.setDisabled(false)
        this.spell.setActive(false)
        this.timesCast = 0;
           
        this.keys = this.input.keyboard.createCursorKeys(); // activating keyboard

        this.createInformation() 

        const newText = this.add.text(50, 275, `You have ${this.inventory.yellowGems} Yellow Gems`, {
            fontSize: '18px',
            color: '#ffffff',
          });

        const newTextGreen = this.add.text(475, 275, `You have ${this.inventory.greenGems} Green Gems`, {
           fontSize: '18px',
           color: '#ffffff',
        });

         //showing the gems - can visual see how gems are taken away  
         const frames = this.textures.get('yellow-gem').getFrameNames();

         let x = 100;
         let y = 220;
 
         let image = this.add.image(x, y, 'yellow-gem', Phaser.Math.RND.pick(frames)).setInteractive({ draggable: true });
 
         for (let i = 0; i < this.inventory.yellowGems; i++){
             
             image = this.add.image(x, y, 'yellow-gem', Phaser.Math.RND.pick(frames)).setInteractive({ draggable: true });
 
             x += 1; 
             y += 1;
         }

         //making the image for green gems
         const framesGreen = this.textures.get('green-gem').getFrameNames();

         let newX = 550;
         let newY = 220;
 
         let imageGreen = this.add.image(newX, newY, 'green-gem', Phaser.Math.RND.pick(framesGreen)).setInteractive({ draggable: true });
 
         for (let i = 0; i < this.inventory.greenGems; i++){
             
             imageGreen = this.add.image(newX, newY, 'green-gem', Phaser.Math.RND.pick(framesGreen)).setInteractive({ draggable: true });
 
             newX += 1; 
             newY += 1;
         }

        this.time.delayedCall(1500, () => {
            const userInput = window.prompt('Enter the number of Air Spells you want:');
 
            // Check if the user input is not null
            if (userInput !== null) {
            //Check if the user unput is a vaild number 
                if (parseInt(userInput) >= 0) {
            // Parse the user input as an integer
                    const numLoopingAirSpells = parseInt(userInput); // transform the inputted text into number

                    const spellsCrafted = this.inventory.add_loopingAirSpell(numLoopingAirSpells); // craft the spells using spell craft method

                    for (let i = 0; i < numLoopingAirSpells; i++) {
                        image.destroy();
                        imageGreen.destroy();
                    }
                    newText.setText(`You have ${this.inventory.yellowGems} Yellow Gems`);
                    newTextGreen.setText(`You have ${this.inventory.greenGems} Green Gems`);
                    

                    if (spellsCrafted != 0) { // we were able to craft at leat 1 spell
                        this.add.text(20, 300, `You now have crafted ${spellsCrafted} Looping Air Spells.\nYou currently have ${this.inventory.loopingAirSpell} in your inventory`, {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                    }
                    else { // we did not have enough resources to craft a spell
                        this.add.text(20, 300, `You do not have enough resources to craft a Looping Air Spell.\nYou currently have ${this.inventory.loopingAirSpell} in your inventory`, {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                    }
            } else {
                // Handle the case where the user input is not a number
                this.add.text(20, 500, 'Please enter a valid number', {
                    fontSize: '28px',
                    color: '#ffffff',
                });
                this.time.delayedCall(1500, () => {
                    const userInput = window.prompt('Enter the number of Air Spells you want:');
                    
                    // Check if the user input is not null
                    if (userInput !== null) {
                    //Check if the user unput is a vaild number 
                        if (parseInt(userInput) >= 0) {
                    // Parse the user input as an integer
                            const numLoopingAirSpells = parseInt(userInput); // transform the inputted text into number

                            const spellsCrafted = this.inventory.add_loopingAirSpell(numLoopingAirSpells); // craft the spells using spell craft method

                            if (spellsCrafted != 0) { // we were able to craft at leat 1 spell
                                this.add.text(20, 300, `You now have crafted ${spellsCrafted} Looping Air Spells.\nYou currently have ${this.inventory.loopingAirSpell} in your inventory`, {
                                    fontSize: '28px',
                                    color: '#ffffff',
                                });
                            }
                            else { // we did not have enough resources to craft a spell
                                this.add.text(20, 300, `You do not have enough resources to craft a Looping Air Spell.\nYou currently have ${this.inventory.loopingAirSpell} in your inventory`, {
                                    fontSize: '28px',
                                    color: '#ffffff',
                                });
                            }
                    } else {
                        // Handle the case where the user input is not a number
                        this.add.text(20, 500, 'Please enter a valid number', {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                      }    
                    } else {
                        // Handle the case where the user input is null
                        this.add.text(20, 350, 'User canceled input dialog', {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                        //console.log('User canceled input dialog');
                    }
                    })
              }    
            } else {
                // Handle the case where the user input is null
                this.add.text(20, 350, 'User canceled input dialog', {
                    fontSize: '28px',
                    color: '#ffffff',
                });
                //console.log('User canceled input dialog');
            }
            })  

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('loopSpell',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('airSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('airSpell');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {        // inventory button
            this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('airSpell');
        }));

        //telling how to make loop
        this.add.text(20, 125, 'You need to use 6 Green Gems and 6 Yellow Gems to make this Spell\nEnter the number of Air Spells you want', {
            fontSize: '28px',
            color: '#ffffff',
        });

       // this.add.text(20,250, 'For(int i = 0; i < number; i++){\n let blueGemsCollected = blueGemsCollected - 4;\n int WaterSpell = WaterSpell + 1\n}\nreturn WaterSpell', {
        //    fontSize: '26px',
        //    color: '#ffffff',
        //});
	}
    update() {
        this.spell.handleSpellAnims()

        if ( this.keys.space.isDown == true && this.spell?.active==false) { // initialize the castiung of the spell
            console.log("first part cast");
			this.player.castLoopSpell(this.player, this.spell)
		}
		if (this.spell?.active == true) {
			this.spell.moveSpell()
		}
		if (this.spell?.isDisabled() == true) {
			this.spell.resetSpellPosition(this.player)
            if (this.timesCast < 2) { // once we have cast the spell 3 times, we are done 
                console.log(this.timesCast);
                this.player.castLoopSpell(this.player, this.spell)
                this.timesCast++;
            } else {
                this.timesCast = 0; // resetting the number of times the spell was cast
            }
            
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