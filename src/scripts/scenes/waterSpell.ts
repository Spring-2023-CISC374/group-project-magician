import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';
import Spell from '../objects/Spell';
import MainCharacter from '../objects/MainCharacter';
import Enemy from '../objects/Enemy';


export default class waterSpell extends Phaser.Scene {
    private blueGemsCollected!: number
    protected player!: MainCharacter
    protected statusEffect!: Phaser.GameObjects.Image
    protected keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    private waterSpellLoop: number	
    protected inventory!: Inventory_Items
    protected currentHealth!: number
    protected spell!: Spell
    protected enemy!: Enemy
    protected test_Spell!: boolean
    
	constructor() {
		super('waterSpell')
        this.waterSpellLoop = 0
	}

    init (data: any) {
		console.log('waterSpell', data)
		this.currentHealth = data.storedHealth
		this.inventory = data.inventory_items
	}


	create() {	
		//making background
        //this.add.image(400, 400, 'background-waterspell')
        const bg = this.add.image(
            this.cameras.main.width/2, this.cameras.main.height/2, 'background-waterspell');
       bg.setScale(
           this.cameras.main.width/(0.5 * bg.width), this.cameras.main.height/(0.5 * bg.height));

        this.createPlayer(80, 515, this.currentHealth) // creating a player
        this.createEnemy(400, 525, 'blue-gem', 80, 10)

        this.spell = new Spell(this, this.player.x + 30, this.player.y, 'iceSpell',"Ice Spell", 8) // ICE Spell Temporarily
        this.spell.handleSpellAnims() // water spell will be 
        this.spell.setDisabled(false)
        this.spell.setActive(false)
        
        this.keys = this.input.keyboard.createCursorKeys(); // activating keyboard

        //telling the location
        this.add.text(10, 40, 'Currently at Water Spell\nPress the Back Button to go to Craft\nSpell', {
            fontSize: '32px',
            color: '#ffffff'
        });

        this.time.delayedCall(100, () => {
            const userInput = window.prompt('Enter the number of Water Spells you want:');
    
            // Initialize gem collected here
            this.waterSpellLoop = 0;
            
            // Check if the user input is not null
            if (userInput !== null) {
                // Parse the user input as an integer
                const numWaterSpells = parseInt(userInput);
    
                // Perform the loop based on the user input
                //let waterSpell = 0;
                for (let i = 0; i < numWaterSpells; i++) {
                    this.blueGemsCollected -= 4;
                    this.waterSpellLoop += 1;
                }
                this.inventory.basicWaterSpell += this.waterSpellLoop;
                this.inventory.blueGems -= 4 * (numWaterSpells)
                this.blueGemsCollected = this.blueGemsCollected - numWaterSpells
                this.add.text(20, 400, `You now have ${this.waterSpellLoop} Water Spells.\nThey are now in your inventory`, {
                    fontSize: '28px',
                    color: '#ffffff',
                });
    
            } else {
                // Handle the case where the user input is null
                console.log('User canceled input dialog');
            }
            })  

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('loopSpell',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
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

        this.add.existing(new Click_Change_Scene(this, 400, 400, 'wand', () => {        // inventory button
            console.log("test spell clicked")
            this.test_Spell = true;
            //this.spell.setActive(false)
        }));

        //telling how to make loop
        this.add.text(20, 150, 'You need to use 4 Blue Gems to make this Spell\nEnter the number of Water Spells you want', {
            fontSize: '28px',
            color: '#ffffff',
        });

        this.add.text(20,250, 'For(int i = 0; i < number; i++){\n let blueGemsCollected = blueGemsCollected - 4;\n int WaterSpell = WaterSpell + 1\n}\nreturn WaterSpell', {
            fontSize: '26px',
            color: '#ffffff',
        });
        
	}
    update() {
        this.spell.handleSpellAnims()

        if (this.test_Spell==true && this.spell?.active==false) { 
            console.log("spell is being tested");
			this.player.castSpell(this.player, this.spell)
		}
		if (this.spell?.active == true) {
			this.spell.moveSpell()
		}
		if (this.spell?.isDisabled() == true) {
			this.spell.resetSpellPosition(this.player)
            this.test_Spell = false;
		}
        this.spell?.checkForOverlap(this.player, this.enemy) // figure out what to interact with
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