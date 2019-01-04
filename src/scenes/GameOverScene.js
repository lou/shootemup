import Phaser from 'phaser';
import { width, height } from '../config/config';
import UIButton from '../classes/components/UIButton';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    this.add.image(width / 2, height / 3, 'title');
    this.gameButton = new UIButton({
      scene: this,
      x: width / 2,
      y: height * 0.6,
      key: 'button1',
      hoverKey: 'button2',
      text: 'Again?',
      targetScene: 'Main',
    });

    this.titleButton = new UIButton({
      scene: this,
      x: width / 2,
      y: height * 0.8,
      key: 'button1',
      hoverKey: 'button2',
      text: 'Main Menu',
      targetScene: 'Title',
    });
  }
}
