export default class Inventory_Items {
    public blueGems = 0
    public redGems = 0
    public yellowGems = 0
    public greenGems = 0

    public add_blue(numCollected: number) {
        this.blueGems = this.blueGems + numCollected
    }   

    public add_red(numCollected: number) {
        this.redGems = this.redGems + numCollected
    }

    public add_yellow(numCollected: number) {
        this.yellowGems = this.yellowGems + numCollected
    }

    public add_green(numCollected: number) {
        this.greenGems = this.greenGems + numCollected
    }
}