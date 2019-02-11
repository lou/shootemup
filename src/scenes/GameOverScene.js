import Phaser from 'phaser';
import { width, height } from '../config/config';
import UIButton from '../classes/components/UIButton';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  create() {
    const text = this.add.text(0, 0, "GAME OVER", {
      fontFamily: 'Impact',
      fontSize: '42px',
      fill: '#FFF',
      align: 'center'
    })
    text.setY(250)
    text.setX(width/2 - text.width/2)

    this.gameButton = new UIButton({
      scene: this,
      x: width / 2,
      y: height * 0.5,
      text: 'Play Again',
      targetScene: 'Game'
    });

    this.titleButton = new UIButton({
      scene: this,
      x: width / 2,
      y: height * 0.57,
      text: 'Menu',
      targetScene: 'Title',
    });
  }
}
