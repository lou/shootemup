import Phaser from 'phaser'
import { width } from '../config/config'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title')
  }

  create() {
    const text = this.add.text(0, 0, 'Rafale', {
      fontFamily: 'Arial Black',
      fontSize: '42px',
      fill: '#FFF',
      align: 'center',
    })
    text.setY(250).setX(width / 2 - text.width / 2)
    this.scene.run('Menu')
  }
}
