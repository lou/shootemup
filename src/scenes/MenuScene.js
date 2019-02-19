import Phaser from 'phaser'
import { height } from '../config/config'
import UIButton from '../classes/components/UIButton'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu')
  }

  create() {
    new UIButton({
      scene: this,
      y: height * 0.4,
      text: !this.scene.get('Game').started ? 'Play' : 'Resume',
      onClick: () => {
        this.scene.sleep('Title')
        this.scene.sleep()
        if (this.scene.get('Game').started) {
          this.scene.resume('Game')
        } else {
          this.scene.start('Game')
        }
      }
    })

    new UIButton({
      scene: this,
      y: height * 0.5,
      text: 'Fullscreen',
      onClick: () => this.scale.toggleFullscreen()
    })

    window.document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement)
        this.scale.stopFullscreen()
    })
  }
}
