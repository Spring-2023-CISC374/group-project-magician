import Phaser from 'phaser'

export default class level_1 extends Phaser.Scene {
	private redberries: any;
	private redbin:any;
	private dragObj: any;
	private items: any;
	private index: any;
	private redCounter: any;
	

	constructor() {
		super('level_1')
	}

	preload() {
		//load image for background of level1
		this.load.image('level1-background', 'assets/background/forest1.png')
		this.load.image('redberries', 'assets/background/redberries.png')
		this.load.image('redbin', 'assets/background/redbin.png')
	}

	create() {		
		this.add.image(300, 300, 'level1-background')

        this.add.text(10, 20, 'Currently at Level 1 \nClick for Combat', {
			fontSize: '32px',
			color: '#ffffff'
		})

        //this.input.on('pointerup', () => {
        //    this.scene.stop('level_1')
        //    this.scene.start('combat_1')
		//})

		this.redbin = this.physics.add.image(100, 500, 'redbin')

		this.redberries = this.physics.add.image(100, 200, 'redberries')
		this.redberries.setInteractive();
		this.input.setDraggable(this.redberries)
		

		this.input.on('pointerdown', this.startDrag, this)
		this.physics.add.overlap(this.redbin, this.redberries, this.pick, undefined, this);
   
	}
	startDrag(pointer: any, targets:any){
		this.input.off('pointerdown', this.startDrag, this);
		this.dragObj=targets[0];
		this.input.on('pointermove', this.doDrag, this);
		this.input.on('pointerup', this.stopDrag, this);
	
	}
	doDrag(pointer: any){
		this.dragObj.x=pointer.x;
		this.dragObj.y=pointer.y;
	}
	stopDrag(){
		this.input.on('pointerdown', this.startDrag, this);
		this.input.off('pointermove', this.doDrag, this);
		this.input.off('pointerup', this.stopDrag, this);
	}

	pick(trashbin: any, item: any){
		if (item.texture.key === 'redberries'){
			this.index = "redberries";
			if (this.physics.overlap(this.redbin, this.redberries)){
				//this.redberries.disableBody(true,true)
				this.redCounter = 0;
				this.redCounter += 1;
				this.add.text(600,35,"Your Score is "+ this.redCounter);
				this.redberries.destroy()
			}
		}
	}
	

	update() {
		//
	}

	

}