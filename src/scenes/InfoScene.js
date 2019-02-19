import Phaser from 'phaser'
import { width, height } from '../config/config'

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super('Info')
  }

  create() {
    this.lives = 10
    this.score = 0
    this.game = this.scene.get('Game')
    this.graphics = this.add.graphics()
    this.graphics.fillStyle(0x000000, 1)
    this.graphics.fillRect(0, height-59, width, 60).setAlpha(0.7)

    this.add.image(30, height - 32, 'life-icon').setScale(0.6)
    this.livesText = this.add.text(45, height - 45, this.lives, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFF'
    })

    this.scoreText = this.add.text(width - 30, height - 45, this.score, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFF',
    }).setOrigin(1, 0)
    this.menuText = this.add.text(width / 2, height - 42, 'MENU', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#000',
      backgroundColor: '#FFF',
      padding: { top: 4, left: 10 },
    }).setOrigin(0.5, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.pause('Game')
        this.scene.run('Menu')
      })

      this.game.events.on('addScore', (score) => {
        this.score += score
        this.scoreText.setText(this.score.toLocaleString())
      })

      this.game.events.on('addLife', life => {
        this.lives += life
        if (this.lives <= 0) {
          this.game.player.bullets.destroy()
          this.game.enemies.destroy()
          this.game.projectiles.destroy()
          this.game.destroyables.destroy()
          this.scene.pause('Game')
          this.scene.launch('GameOver')
        } else {
          this.livesText.setText(this.lives.toLocaleString())
        }
      })
  }
}
