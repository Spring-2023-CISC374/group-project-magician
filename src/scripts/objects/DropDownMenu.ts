export default class DropDownMenu extends Phaser.GameObjects.Image {
  private options: Phaser.GameObjects.Group;
  private button: Phaser.GameObjects.Text;
  add: any;

  constructor(scene: Phaser.Scene, x: number, y: number, buttonText: string, optionsText: string[]) {
    super(scene, x, y, buttonText);

    // Create the button object
    this.button = scene.add.text(0, 0, buttonText, { fontSize: '24px', color: '#000' })
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.toggleOptions();
      });
    this.add(this.button);

    // Create the options group
    this.options = scene.add.group();
    for (let i = 0; i < optionsText.length; i++) {
      const option = scene.add.text(0, (i + 1) * 30, optionsText[i], { fontSize: '18px', color: '#000' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          // Perform action when an option is selected
          console.log(`Selected option: ${optionsText[i]}`);
          this.toggleOptions();
        });
      this.options.add(option);
    }
    this.add(this.options);
    this.options.setVisible(false);
  }

  private toggleOptions() {
    this.options.setVisible(!this.options.setVisible);
  }
}
