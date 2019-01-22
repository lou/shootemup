import Phaser from 'phaser'
import Player from '../sprites/Player'
import Enemy from '../sprites/enemies/Enemy'
import Bonus from '../sprites/bonuses/Bonus'
import { enemies }  from '../sprites/enemies'
import { width, height } from '../config/config'

const config = {
  waves: [{
    enemies: [{
      type: 'Bomber',
      x: 360,
      y: -300,
    },{
      type: 'Carrier',
      x: 190,
      y: -90,
      bonus: 'Gun'
    }, {
      type: 'Carrier',
      x: 100,
      y: -100,
    },{
      type: 'Carrier',
      x: 150,
      y: -160,
    },{
      type: 'Carrier',
      x: 250,
      y: -190,
    },{
      type: 'Carrier',
      x: 300,
      y: -200,
    },{
      type: 'Carrier',
      x: 300,
      y: -300,
    },{
      type: 'Carrier',
      x: 500,
      y: -900,
    },{
      type: 'Carrier',
      x: 300,
      y: -600,
    },{
      type: 'Carrier',
      x: 100,
      y: -800,
    },{
      type: 'Carrier',
      x: 300,
      y: -500,
    }, {
      type: 'Carrier',
      x: 500,
      y: -780,
    }, {
      type: 'Kamikaze',
      x: 600,
      y: -600,
      bonus: 'Shield'
    }, {
      type: 'Helicopter',
      x: 500,
      y: 100,
      bonus: 'Life'
    }]
  }]
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
    this.score = 0
    this.wave = {
      index: 0
    }
  }

  startWave() {
    config.waves[this.wave.index].enemies.forEach(options => {
      const { type, ...otherOptions } = options

      let enemy = new enemies[type](this, otherOptions)
      this.enemies.add(enemy)
    })
  }

  setInfos() {
    this.player.previousLives = this.player.lives
  }

  updateInfos() {
    this.livesText.setText(this.player.lives)
  }

  create() {
    this.player = new Player(this, width / 2, height - 100, 'plane')
    this.enemies = this.physics.add.group({ runChildUpdate: true, classType: Enemy })
    this.bonuses = this.physics.add.group({ runChildUpdate: true, classType: Bonus })

    // BAR
    this.add.image(30, 25, 'life-icon').setScale(0.5)
    this.livesText = this.add.text(42, 15, this.player.lives, { fontSize: '21px', fill: '#FFF' })

    this.startWave()

    // Colliders
    this.physics.add.overlap(this.player, this.enemies.getChildren(), (player, enemy) => {
      player.hitByEnemy(enemy)
    })
    this.physics.add.overlap(this.player, this.bonuses.getChildren(), (_, bonus) => {
      bonus.consume()
    })
    this.physics.add.overlap(this.enemies.getChildren(), this.player.bullets.getChildren(), (enemy, bullet) => {
      enemy.hit(bullet)
    })
    this.physics.add.overlap(this.enemies.getChildren(), this.player.bullets2.getChildren(), (enemy, bullet) => {
      enemy.hit(bullet)
    })
    this.physics.add.collider(this.enemies)
    this.physics.add.collider(this.bonuses)

    // Particles
    this.hitParticles = this.add.particles('hit')
    this.bonusParticles = this.add.particles('bonus')

    this.cursors = this.input.keyboard.createCursorKeys()

    this.input.on('pointerdown', () => {
      this.scene.start('GameOver')
    })
  }

  handleGameOver() {
    if (!this.player.lives) {
      this.scene.start('GameOver')
    }
  }

  update(time, delta) {
    if (this.enemies.getChildren().length <= 2) {
      this.startWave(this)
    }
    this.player.move(this.cursors)
    this.updateInfos()
    this.handleGameOver()
  }
}
