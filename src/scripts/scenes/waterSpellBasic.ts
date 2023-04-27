import Phaser from 'phaser'
import Click_Change_Scene from '../objects/Click_Change_Scene';


export default class waterSpellBasic extends Phaser.Scene {
    public blueGemsCollected: number
	constructor() {
		super('waterSpellBasic')
	}

	create() {	
		//making background
        //this.add.image(400, 400, 'background-waterspell')
        const bg = this.add.image(
            this.cameras.main.width/2, this.cameras.main.height/2, 'background-waterspell');
       bg.setScale(
           this.cameras.main.width/(0.5 * bg.width), this.cameras.main.height/(0.5 * bg.height));

        //telling the location
        const message = this.add.text(10, 40, 'Currently at Water Spell\nPress the Back Button to go to Craft\nSpell', {
            fontSize: '32px',
            color: '#ffffff'
        });

        //making buttons
        this.add.existing(new Click_Change_Scene(this, 50, 560, 'backbutton', () => {        // back button
            this.scene.start('basicSpell');
            this.scene.stop('waterSpellBasic');
        }));

        this.add.existing(new Click_Change_Scene(this, 655, 560, 'map_marker', () => {            // create button to go to map
            this.scene.start('map');
            this.scene.stop('waterSpellBasic');
        }));

        this.add.existing(new Click_Change_Scene(this, 760, 560, 'inventory_icon', () => {        // inventory button
            this.scene.start('inventory', {
                "blueGemsCollected": this.blueGemsCollected
            });
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
                this.blueGemsCollected -= 4;
                waterSpell += 1;
            }
            this.blueGemsCollected = this.blueGemsCollected - numWaterSpells
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
    
}