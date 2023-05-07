//import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';
import Inventory_Items from '../objects/Inventory_Items';
//import CommonLevel from './CommonLevel'


export default class airSpellBasic extends Phaser.Scene {
    private yellowGemsCollected!: number
    private greenGemsCollected!: number
    //private airSpellLoop: number	
    protected inventory!: Inventory_Items
    protected currentHealth!: number
    
	constructor() {
		super('airSpellBasic')
        ///this.airSpellLoop = 0
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

        //telling the location
        //this.add.text(10, 40, 'Currently at Water Spell\nPress the Back Button to go to Craft\nSpell', {
        //    fontSize: '32px',
        //    color: '#ffffff'
        //});

        this.createInformation() 

        this.time.delayedCall(1500, () => {
            const userInput = window.prompt('Enter the number of Air Spells you want:');
    
            // Initialize gem collected here
            this.inventory.basicAirSpell = 0;
            
            // Check if the user input is not null
            if (userInput !== null) {
            
            //Check if user input is a vaild number
                if (parseInt(userInput) >= 0) {

                // Parse the user input as an integer
                    const numairSpells = parseInt(userInput);
    
                // Perform the loop based on the user input
                //let waterSpell = 0;
                    for (let i = 0; i < numairSpells; i++) {
                        this.yellowGemsCollected -= 1;
                        this.greenGemsCollected -= 1;
                        this.inventory.basicAirSpell += 1;
                    }
                this.inventory.airSpell += this.inventory.basicAirSpell;
                this.inventory.yellowGems -= 1 * (numairSpells)
                this.inventory.greenGems -= 1 * (numairSpells)
                
                this.yellowGemsCollected = this.yellowGemsCollected - numairSpells
                this.greenGemsCollected = this.greenGemsCollected - numairSpells
                
                this.add.text(20, 300, `You now have ${this.inventory.basicAirSpell} Air Spells.\nThey are now in your inventory`, {
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
                    const userInput = window.prompt('Enter the number of Air Spells you want:');
            
                    // Initialize gem collected here
                    this.inventory.basicAirSpell = 0;
                    
                    // Check if the user input is not null
                    if (userInput !== null) {
                    
                    //Check if user input is a vaild number
                        if (parseInt(userInput) >= 0) {
        
                        // Parse the user input as an integer
                            const numairSpells = parseInt(userInput);
            
                        // Perform the loop based on the user input
                        //let waterSpell = 0;
                            for (let i = 0; i < numairSpells; i++) {
                                this.yellowGemsCollected -= 1;
                                this.greenGemsCollected -= 1;
                                this.inventory.basicAirSpell += 1;
                            }
                        this.inventory.airSpell += this.inventory.basicAirSpell;
                        this.inventory.yellowGems -= 1 * (numairSpells)
                        this.inventory.greenGems -= 1 * (numairSpells)
                        
                        this.yellowGemsCollected = this.yellowGemsCollected - numairSpells
                        this.greenGemsCollected = this.greenGemsCollected - numairSpells
                        
                        this.add.text(20, 300, `You now have ${this.inventory.basicAirSpell} Air Spells.\nThey are now in your inventory`, {
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
                        this.add.text(20, 300, 'User canceled input dialog', {
                            fontSize: '28px',
                            color: '#ffffff',
                        });
                        //console.log('User canceled input dialog');
                    }
                    })  
            }    
            } else {
                // Handle the case where the user input is null
                this.add.text(20, 300, 'User canceled input dialog', {
                    fontSize: '28px',
                    color: '#ffffff',
                });
                //console.log('User canceled input dialog');
            }
            })  

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('basicSpell',  {inventory_items: this.inventory, prev_scene: this.scene.key, storedHealth: this.currentHealth});
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
        this.add.text(20, 125, 'You need to use 1 Green Gems and 1 Yellow Gems to make this Spell\nEnter the number of Air Spells you want', {
            fontSize: '28px',
            color: '#ffffff',
        });

       // this.add.text(20,250, 'For(int i = 0; i < number; i++){\n let blueGemsCollected = blueGemsCollected - 4;\n int WaterSpell = WaterSpell + 1\n}\nreturn WaterSpell', {
        //    fontSize: '26px',
        //    color: '#ffffff',
        //});
        
        
	}
    
}