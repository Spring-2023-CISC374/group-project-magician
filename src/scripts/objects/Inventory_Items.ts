export default class Inventory_Items {
    public blueGems: number
    public redGems: number
    public yellowGems: number
    public greenGems: number

    public waterSpells:number

    constructor() {
        this.blueGems = 0
        this.redGems = 0
        this.yellowGems = 0
        this.greenGems = 0

        this.waterSpells = 0

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

    add_waterspellLoop(numCollected: number){
        this.waterSpells = this.waterSpells + numCollected
    }
}