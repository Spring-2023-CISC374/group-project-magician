export default class Inventory_Items {
    public blueGems: number
    public redGems: number
    public yellowGems: number
    public greenGems: number

    public waterSpell: number
    public airSpell: number

    constructor() {
        this.blueGems = 0
        this.redGems = 0
        this.yellowGems = 0
        this.greenGems = 0

        this.waterSpell = 0
        this.airSpell = 0

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

    add_waterSpell(numCollected: number) {
        this.waterSpell = this.waterSpell + numCollected
    } 
    
    add_airSpell(numCollected: number){
        this.airSpell = this.airSpell + numCollected
    }
}