import Phaser from 'phaser';
import { width, height } from '../config/config';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super('Pause');
  }

  create() {
    this.pauseText = this.add.text(width*0.5-21, height*0.5-21, '▶', {
      fontFamily: 'Impact',
      fontSize: '42px',
      color: '#FFF'
    })
    this.input.on('pointerdown', () => {
      this.pauseText.destroy()
      this.scene.resume('Game')
    })
  }
}
