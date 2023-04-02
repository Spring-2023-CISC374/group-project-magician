import Phaser from 'phaser'

export default class level_1 extends Phaser.Scene {
	private redberries: any;
	private redbin:any;
	private blueberries: any;
	private bluebin:any;
	private dragObj: any;
	private items: any;
	private index: any;
	private redCounter: any;
	private blueCounter: any;
	

	constructor() {
		super('level_1')
	}

	preload() {
		//load image for background of level1
		this.load.image('level1-background', 'assets/background/forest1.png')

		//red berries and red trashcan
		this.load.image('redberries', 'assets/background/redberries.png')
		this.load.image('redbin', 'assets/background/redbin.png')

		//blue berries and blue trashcan
		//this.load.image('blueberries', 'assets/background/blueberries.png')
		//this.load.image('bluebin', 'assets/background/bluebin.png')

	}

	create() {		
		this.add.image(300, 300, 'level1-background')

        this.add.text(10, 20, 'Currently at Level 1 \nClick for Combat', {
			fontSize: '32px',
			color: '#ffffff'
		})

        this.input.on('pointerup', () => {
            this.scene.stop('level_1')
            this.scene.start('combat_1')
		})

		//adding the bins
		this.redbin = this.physics.add.image(100, 485, 'redbin')

		//this.bluebin = this.physics.add.image(300, 485, 'bluebin')

		//adding the berries
		this.redberries = this.physics.add.image(100, 200, 'redberries')
		this.redberries.setInteractive();
		this.input.setDraggable(this.redberries)

		//this.blueberries = this.physics.add.image(300, 200, 'blueberries')
		//this.blueberries.setInteractive();
		//this.input.setDraggable(this.blueberries)
		
		
		//making the berries drag
		this.input.on('pointerdown', this.startDrag, this)
		
		this.physics.add.overlap(this.redbin, this.redberries, this.pick, undefined, this);

		//this.physics.add.overlap(this.bluebin, this.blueberries, this.pick, undefined, this);
   
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
				this.add.text(500,35,"Your Red Berries Score is "+ this.redCounter);
				this.redberries.destroy()
			}
		}
		/*
		else if (item.texture.key === 'blueberries'){
			this.index = "blueberries";
			if (this.physics.overlap(this.bluebin, this.blueberries)){
				//this.redberries.disableBody(true,true)
				this.blueCounter = 0;
				this.blueCounter += 1;
				this.add.text(500,45,"Your Blue Berries Score is "+ this.blueCounter);
				this.blueberries.destroy()
			}
		}
		*/
	}
	

	update() {
		//
	}

	

}