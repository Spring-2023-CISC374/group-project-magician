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
        this.blueGems = 0
        this.redGems = 0
        this.yellowGems = 0
        this.greenGems = 0

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

    add_basicWaterSpell(numCollected: number) {
        this.basicWaterSpell = this.basicWaterSpell + numCollected
    }    
    add_loopingWaterSpell(numCollected: number) {
        this.loopingWaterSpell = this.loopingWaterSpell + numCollected
    }

    add_basicFireSpell(numCollected: number) {
        this.basicFireSpell = this.basicFireSpell + numCollected
    }    
    add_loopingFireSpell(numCollected: number) {
        this.loopingFireSpell = this.loopingFireSpell + numCollected
    }

    add_basicAirSpell(numCollected: number) {
        this.basicAirSpell = this.basicAirSpell + numCollected
    }    
    add_loopingAirSpell(numCollected: number) {
        this.loopingAirSpell = this.loopingAirSpell + numCollected
    }

}