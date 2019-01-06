import Phaser from 'phaser';

export default class UIButton extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene; // the scene this button Game Object will belong to
    this.targetScene = config.targetScene; // the scene we will transition to when the player clicks the button
    this.x = config.x; // the x position of our container
    this.y = config.y; // the y position of our container
    this.key = config.key; // the background image of our button
    this.hoverKey = config.hoverKey; // the image that will be displayed when the player hovers over the button
    this.text = config.text; // the text that will be displayed on our button

    this.createButton();
    this.scene.add.existing(this); // add this container to the Phaser Scene
  }

  createButton() {
    this.gameButton = this.scene.add.image(0, 0, this.key).setInteractive();
    this.gameText = this.scene.add.text(0, 0, this.text, { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.gameText, this.gameButton);

    this.add(this.gameButton);
    this.add(this.gameText);

    this.gameButton.on('pointerdown', () => {
      this.scene.scene.start(this.targetScene);
    });

    this.gameButton.on('pointerover', () => {
      this.gameButton.setTexture(this.hoverKey);
    });

    this.gameButton.on('pointerout', () => {
      this.gameButton.setTexture(this.key);
    });
  }
}
