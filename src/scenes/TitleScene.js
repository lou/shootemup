import Phaser from 'phaser';
import { width, height } from '../config/config';
import UIButton from '../classes/components/UIButton';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const text = this.add.text(0, 0, "Rafale", {
      fontFamily: 'Arial Black',
      fontSize: '42px',
      fill: '#FFF',
      align: 'center'
    })
    text.setY(250)
    text.setX(width/2 - text.width/2)
    this.gameButton = new UIButton({
      scene: this,
      y: height * 0.6,
      text: 'Play',
      targetScene: 'Game',
    });
  }
}
