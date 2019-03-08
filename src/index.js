import Phaser from 'phaser'
import { width, height } from './config/config'
import scenes from './scenes/scenes'

const config = {
  width,
  height,
  type: Phaser.AUTO,
  parent: 'phaser-game',
  scene: scenes,
  backgroundColor: '#030b14',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.HEIGHT_CONTROLS_WIDTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
    }
  }
}

class Game extends Phaser.Game {
  constructor() {
    super(config)
    this.scene.start('Boot')
  }
}

window.onload = () => {
  window.game = new Game()
}
