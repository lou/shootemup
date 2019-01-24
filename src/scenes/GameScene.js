import Phaser from 'phaser'
import Player from '../sprites/Player'
import Enemy from '../sprites/enemies/Enemy'
import Bonus from '../sprites/bonuses/Bonus'
import { enemies }  from '../sprites/enemies'
import { width, height } from '../config/config'
import Vehicle from '../sprites/Vehicle';

const config = {
  waves: [{
    enemies: [
      // {
      //   type: 'Bomber',
      //   x: 360,
      //   y: -300,
      // },
      // {
      //   type: 'Carrier',
      //   x: 190,
      //   y: -90,
      //   bonus: 'Gun'
      // },
      // {
      //   type: 'Carrier',
      //   x: 100,
      //   y: -100,
      // },
      // {
      //   type: 'Carrier',
      //   x: 150,
      //   y: -160,
      // },
      // {
      //   type: 'Carrier',
      //   x: 250,
      //   y: -190,
      // },
      // {
      //   type: 'Carrier',
      //   x: 300,
      //   y: -200,
      // },
      // {
      //   type: 'Carrier',
      //   x: 300,
      //   y: -300,
      // },
      // {
      //   type: 'Carrier',
      //   x: 500,
      //   y: -900,
      // },
      // {
      //   type: 'Carrier',
      //   x: 300,
      //   y: -600,
      // },
      // {
      //   type: 'Carrier',
      //   x: 100,
      //   y: -800,
      // },
      // {
      //   type: 'Carrier',
      //   x: 300,
      //   y: -500,
      // },
      // {
      //   type: 'Carrier',
      //   x: 500,
      //   y: -780,
      // },
      {
        type: 'Kamikaze',
        x: 100,
        y: 60,
        bonus: 'Shield'
      },
      {
        type: 'Helicopter',
        x: 500,
        y: 100,
        bonus: 'Life'
      }
    ]
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
    this.shapes = this.cache.json.get('shapes')

    this.enemies = []
    this.enemies.push(this.matter.add.sprite(width/2, 200, 'kamikaze', null, { shape: this.shapes.kamikaze }))
    this.enemies.push(this.matter.add.sprite(width/2, 100, 'carrier', null, { shape: this.shapes.carrier }))


    this.player = new Vehicle(this, 'plane', { x: width / 2, y: height - 40 })
    // this.player = this.matter.add.sprite(width/2, height - 40, 'plane', null, { shape: shapes.plane })

    // this.matter.world.setBounds(0, 0, width, height)

    this.cursors = this.input.keyboard.createCursorKeys()

    this.matter.world.on('collisionactive', function (event, a, b) {
      console.log('collision', a.parent.label, b.parent.label);
    });

    // this.player = new Player(this, width / 2, height - 100, 'plane')
    // this.enemies = this.add.group({ runChildUpdate: true, classType: Enemy })
    // this.bonuses = this.add.group({ runChildUpdate: true, classType: Bonus })

    // // BAR
    // this.add.image(30, 25, 'life-icon').setScale(0.5)
    // this.livesText = this.add.text(42, 15, this.player.lives, { fontSize: '21px', fill: '#FFF' })

    // this.startWave()

    // // Colliders
    // this.matter.add.overlap(this.player, this.enemies.getChildren(), (player, enemy) => {
    //   player.hitByEnemy(enemy)
    // })
    // this.matter.add.overlap(this.player, this.bonuses.getChildren(), (_, bonus) => {
    //   bonus.consume()
    // })
    // this.matter.add.overlap(this.enemies.getChildren(), this.player.bullets.getChildren(), (enemy, bullet) => {
    //   enemy.hit(bullet)
    // })
    // this.matter.add.overlap(this.enemies.getChildren(), this.player.bullets2.getChildren(), (enemy, bullet) => {
    //   enemy.hit(bullet)
    // })
    // this.matter.add.collider(this.enemies)
    // this.matter.add.collider(this.bonuses)

    // // Particles
    // this.hitParticles = this.add.particles('hit')
    // this.bonusParticles = this.add.particles('bonus')

    // this.cursors = this.input.keyboard.createCursorKeys()

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
    this.enemies.forEach((enemy, index) => {
      enemy.setFixedRotation()
      enemy.setVelocityY(2+index*5)
    })
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-6);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(6);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-6);
    }
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(6);
    }

    if (this.player.x - this.player.width / 2  < 0) {
      this.player.x = this.player.width / 2
    }
    else if (this.player.x + this.player.width / 2  > width) {
      this.player.x = width - this.player.width / 2
    }

    if (this.player.y - this.player.height / 2  < 0) {
      this.player.y = this.player.height / 2
    }
    else if (this.player.y + this.player.height / 2  > height) {
      this.player.y = height - this.player.height / 2
    }

    // if (this.enemies.getChildren().length <= 0) {
    //   this.startWave(this)
    // }
    // this.player.move(this.cursors)
    // this.updateInfos()
    // this.handleGameOver()
  }
}
