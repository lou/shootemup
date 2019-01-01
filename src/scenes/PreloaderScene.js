import Phaser from 'phaser';
import Bar from '../classes/components/Bar';
import Align from '../classes/utils/Align';
import { width, height } from '../config/config';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    // add logo image
    const logo = this.add.image(width / 2, height / 3, 'logo');
    Align.scaleToGameWidth(logo, 0.4, width);

    // display progress bar
    this.bar = new Bar({
      scene: this,
      x: width / 2,
      y: height * 0.7,
      color: '0x222222',
    });

    this.progText = this.add.text(width / 2, height * 0.7, '0%', {
      color: '#ffffff',
      fontSize: width / 20,
    });

    this.progText.setOrigin(0.5, 0.5);
    this.load.on('progress', this.onProgress, this);

    // load assets needed in our game
    this.load.image('title', 'assets/images/title.png');
    this.load.image('button1', 'assets/images/ui/blue_button02.png');
    this.load.image('button2', 'assets/images/ui/blue_button03.png');
  }

  onProgress(value) {
    this.bar.setPercent(value);
    const per = Math.floor(value * 100);
    this.progText.setText(`${per}%`);
  }

  create() {
    this.scene.start('Title');
  }
}
