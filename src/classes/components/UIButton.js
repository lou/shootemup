import Phaser from 'phaser';

export default class UIButton extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    this.targetScene = config.targetScene;
    this.x = config.x;
    this.y = config.y;
    this.key = config.key;
    this.hoverKey = config.hoverKey;
    this.text = config.text;

    this.gameButton = this.scene.add.image(this.x, this.y, this.key).setInteractive();
    this.gameText = this.scene.add.text(0, 0, this.text, { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.scene.start(this.targetScene);
    });

    this.scene.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture(this.hoverKey);
    });

    this.scene.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture(this.key);
    });

    this.scene.add.existing(this);
  }
}
