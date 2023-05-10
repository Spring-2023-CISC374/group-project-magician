export default class Inventory_Items {
    public blueGems: number
    public redGems: number
    public yellowGems: number
    public greenGems: number

    public basicWaterSpell: number
    public loopingWaterSpell: number
    public basicFireSpell: number
    public loopingFireSpell: number
    public basicAirSpell: number
    public loopingAirSpell: number

    constructor() {
        this.blueGems = 20
        this.redGems = 20
        this.yellowGems = 20
        this.greenGems = 20

        this.basicWaterSpell = 0
        this.loopingWaterSpell = 0
        this.basicFireSpell = 0
        this.loopingFireSpell = 0
        this.basicAirSpell = 0
        this.loopingAirSpell = 0

    }

    add_blue(numCollected: number) {
        this.blueGems = this.blueGems + numCollected
    }   

    add_red(numCollected: number) {
        this.redGems = this.redGems + numCollected
    }

    add_yellow(numCollected: number) {
        this.yellowGems = this.yellowGems + numCollected
    }

    add_green(numCollected: number) {
        this.greenGems = this.greenGems + numCollected
    }

    //add_waterSpell(numCollected: number) {
    //    this.waterSpell = this.waterSpell + numCollected
    //} 

    add_basicWaterSpell(SpellsCrafting: number) {
        let waterSpellBasicCrafted = 0
        if (this.blueGems >= 4 && SpellsCrafting > 0) {
            waterSpellBasicCrafted++
            this.basicWaterSpell++
            SpellsCrafting--
            this.blueGems = this.blueGems - 4
        }
        return waterSpellBasicCrafted
    }    
    add_loopingWaterSpell(SpellsCrafting: number) {
        let waterSpellLoopingCrafted = 0
        if (this.blueGems >= 12 && SpellsCrafting > 0) {
            waterSpellLoopingCrafted++
            this.loopingWaterSpell++
            SpellsCrafting--
            this.blueGems = this.blueGems - 12
        }
        return waterSpellLoopingCrafted
    }

    add_basicFireSpell(SpellsCrafting: number) {
        let fireSpellBasicCrafted = 0
        if (this.redGems >= 4 && SpellsCrafting > 0) {
            fireSpellBasicCrafted++
            this.basicFireSpell++
            SpellsCrafting--
            this.redGems = this.redGems - 4
        }
        return fireSpellBasicCrafted
    }    
    add_loopingFireSpell(SpellsCrafting: number) {
        let fireSpellLoopingCrafted = 0
        if (this.redGems >= 12 && SpellsCrafting > 0) {
            fireSpellLoopingCrafted++
            this.loopingFireSpell++
            SpellsCrafting--
            this.redGems = this.redGems - 12
        }
        return fireSpellLoopingCrafted
    }

    add_basicAirSpell(SpellsCrafting: number) {
        let airSpellBasicCrafted = 0
        
        while (this.greenGems >= 2 && this.yellowGems > 2 && SpellsCrafting > 0) {
            airSpellBasicCrafted++;
            this.basicAirSpell++;
            SpellsCrafting--;
            this.greenGems = this.greenGems - 2
            this.yellowGems = this.yellowGems - 2
        }
        return airSpellBasicCrafted;
    }    
    add_loopingAirSpell(SpellsCrafting: number) {
        let airSpellLoopingCrafted = 0
        if (this.greenGems >= 6 && this.yellowGems > 6 &&SpellsCrafting > 0) {
            airSpellLoopingCrafted++
            this.loopingAirSpell++
            SpellsCrafting--
            this.greenGems = this.greenGems - 6
            this.yellowGems = this.yellowGems - 6
        }
        return airSpellLoopingCrafted
    }

}