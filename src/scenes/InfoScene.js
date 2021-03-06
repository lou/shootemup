import Phaser from 'phaser'
import { width, height } from '../config/config'

export default class InfoScene extends Phaser.Scene {
  constructor() {
    super('Info')
  }

  create() {
    const w = Math.min(width, innerWidth)
    const h = Math.min(height, innerHeight)

    this.lives = 3
    this.score = 0
    this.game = this.scene.get('Game')
    this.graphics = this.add.graphics()
    this.graphics.fillStyle(0x000000, 1)
    this.graphics.fillRect(0, h - 59, w, 60).setAlpha(0.7)

    const offset = 140
    this.add.image(w / 2 - offset, h - 32, 'life-icon').setScale(0.6)
    this.livesText = this.add.text(w / 2 - offset + 15, h - 45, this.lives, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFF',
    })

    this.scoreText = this.add
      .text(w / 2 + offset, h - 45, this.score, {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#FFF',
      })
      .setOrigin(1, 0)
    this.menuText = this.add
      .text(w / 2, h - 42, 'MENU', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#000',
        backgroundColor: '#FFF',
        padding: { top: 4, left: 10 },
      })
      .setOrigin(0.5, 0)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.pause('Game')
        this.scene.run('Menu')
      })
    this.game.events.on('addScore', score => {
      this.score += score
      this.scoreText.setText(this.score.toLocaleString())
    })

    this.game.events.on('addLife', life => {
      this.lives += life
      this.livesText.setText(this.lives.toLocaleString())
      if (this.lives <= 0) {
        this.game.player.projectiles.destroy()
        this.scene.pause('Game')
        this.scene.launch('GameOver')
      }
    })
  }
}
