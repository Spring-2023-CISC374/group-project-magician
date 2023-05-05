import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';
import Spell from '../objects/Spell';
import Enemy from '../objects/Enemy';
import MainCharacter from '../objects/MainCharacter';


export default class waterSpellBasic extends Phaser.Scene {
    protected inventory!: Inventory_Items
    protected currentHealth!: number
    protected spell!: Spell
    protected enemy!: Enemy
    protected player!: MainCharacter
    protected keys!: Phaser.Types.Input.Keyboard.CursorKeys;
    
	constructor() {
		super('waterSpellBasic')
	}
    init (data: any) {
		console.log('waterSpellBasic', data)
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

        //telling the location
        this.add.text(10, 40, 'Currently at Water Spell\nPress the Back Button to go to Craft\nSpell', {
            fontSize: '32px',
            color: '#ffffff'
        });  // message

        this.createPlayer(80, 515, this.currentHealth) // creating a player
        this.createEnemy(400, 525, 'blue-gem', 80, 10) // creating a gen the spell will hit

        this.spell = new Spell(this, this.player.x + 30, this.player.y, 'iceSpell',"Ice Spell", 8) // ICE Spell Temporarily
        this.spell.handleSpellAnims() // water spell will be 
        this.spell.setDisabled(false)
        this.spell.setActive(false)
        
        this.keys = this.input.keyboard.createCursorKeys(); // activating keyboard

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('basicSpell', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('waterSpellBasic');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('waterSpellBasic');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {        // inventory button
            this.scene.start('inventory', {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
            this.scene.stop('waterSpellBasic');
        }));

        //telling how to make loop
        this.add.text(20, 150, 'You need to use 4 Blue Gems to make this Spell\nEnter the number of Water Spells you want', {
            fontSize: '28px',
            color: '#ffffff',
        });

        this.add.text(20,250, 'if(number > 0) {\n if((number % 4) == 0){\n let WaterSpellBasic = WaterSpellBasic + 1;\n }\nelse{\n print("Use a mutiple of 4!")\n}\n\n}', {
            fontSize: '28px',
            color: '#ffffff',
        });
        
        this.time.delayedCall(10000, () => {
        const userInput = window.prompt('Enter the number of Water Spells you want:');
        
        // Check if the user input is not null
        if (userInput !== null) {
            // Parse the user input as an integer
            const numWaterSpells = parseInt(userInput);

            // Perform the loop based on the user input
            let waterSpell = 0;
            for (let i = 0; i < numWaterSpells; i++) {
                this.inventory.add_blue(-4)
                waterSpell += 1;
            }
            this.inventory.blueGems = this.inventory.blueGems - numWaterSpells
            this.add.text(20, 425, `You now have ${waterSpell} Water Spells.\nThey are now in your inventory`, {
                fontSize: '28px',
                color: '#ffffff',
            });

        } else {
            // Handle the case where the user input is null
            console.log('User canceled input dialog');
        }
        })      

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