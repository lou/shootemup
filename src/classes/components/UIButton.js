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

    this.createButton();
    this.scene.add.existing(this);
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
