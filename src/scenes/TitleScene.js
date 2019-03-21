import Phaser from 'phaser'
import { width, height } from '../config/config'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title')
  }

  create() {
    const w = Math.min(width, innerWidth)
    const h = Math.min(height, innerHeight)
    const text = this.add.text(0, 0, 'Rafale', {
      fontFamily: 'Arial Black',
      fontSize: '42px',
      fill: '#FFF',
      align: 'center',
    })
    text.setY(h * 0.3).setX(w / 2 - text.width / 2)
    this.scene.run('Menu')
  }
}
