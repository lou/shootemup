import Phaser from 'phaser'
import { width, height } from '../config/config'
import UIButton from '../classes/components/UIButton'

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver')
  }

  create() {
    const w = Math.min(width, innerWidth)
    const h = Math.min(height, innerHeight)
    const text = this.add.text(0, 0, 'GAME OVER', {
      fontFamily: 'Arial Black',
      fontSize: '42px',
      fill: '#FFF',
      align: 'center',
    })
    text.setY(250)
    text.setX(w / 2 - text.width / 2)
    const infoScene = this.scene.get('Info')

    infoScene.menuText.destroy()

    new UIButton({
      scene: this,
      x: w / 2,
      y: h * 0.5,
      text: 'Play Again',
      onClick: _ => {
        this.scene.start('Game')
      },
    })

    new UIButton({
      scene: this,
      x: w / 2,
      y: h * 0.6,
      text: 'Menu',
      onClick: _ => {
        this.scene.get('Game').started = false
        this.scene.stop('Game')
        this.scene.stop('Info')
        this.scene.start('Title')
      },
    })
  }
}
