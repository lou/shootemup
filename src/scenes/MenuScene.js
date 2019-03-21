import Phaser from 'phaser'
import { height } from '../config/config'
import UIButton from '../classes/components/UIButton'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu')
  }

  create() {
    const h = Math.min(height, innerHeight)
    new UIButton({
      scene: this,
      y: h * 0.4,
      text: !this.scene.get('Game').started ? 'Play' : 'Resume',
      onClick: () => {
        this.scene.sleep('Title')
        this.scene.sleep()
        if (this.scene.get('Game').started) {
          this.scene.resume('Game')
        } else {
          this.scene.start('Game')
        }
      },
    })

    if (this.scene.get('Game').started) {
      new UIButton({
        scene: this,
        y: h * 0.6,
        text: 'Restart',
        onClick: () => {
          this.scene.sleep('Title')
          this.scene.sleep()
          this.scene.get('Game').scene.restart()
        },
      })
    }

    new UIButton({
      scene: this,
      y: h * 0.5,
      text: 'Fullscreen',
      onClick: () => this.scale.toggleFullscreen(),
    })

    window.document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) this.scale.stopFullscreen()
    })
  }
}
