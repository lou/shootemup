import Phaser from 'phaser';
import { width, height } from '../config/config';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  create() {
    this.logo = this.add.image(width / 2, height / 2, 'logo');
    this.logo.setScale(0.5);
    this.input.on('pointerdown', () => {
      this.scene.start('GameOver');
    });
  }
}
