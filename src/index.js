import Phaser from 'phaser'
import { width, height } from './config/config'
import scenes from './scenes/scenes'

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  scene: scenes,
  backgroundColor: '#030b14',
  scale: {
    width,
    height,
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
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
