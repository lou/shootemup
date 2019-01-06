import Phaser from 'phaser';

export default class Bar extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene; // the scene this button Game Object will belong to
    // the color of our Bar Game Object
    if (!config.color) {
      config.color = 0xff0000;
    }
    // the width of our Bar Game Object
    if (!config.width) {
      config.width = 200;
    }
    // the height of our Bar Game Object
    if (!config.height) {
      config.height = config.width / 4;
    }

    this.graphics = this.scene.add.graphics();
    this.graphics.fillStyle(config.color, 1);
    this.graphics.fillRect(0, 0, config.width, config.height);

    this.add(this.graphics); // add our Graphics Game Object to our Container

    this.graphics.x = -config.width / 2;
    this.graphics.y = -config.height / 2;

    // set the x and y position of our Container
    if (config.x) {
      this.x = config.x;
    }
    if (config.y) {
      this.y = config.y;
    }
    this.scene.add.existing(this); // add this container to the Phaser Scene
  }

  setPercent(per) {
    this.graphics.scaleX = per;
  }
}
