import Phaser from 'phaser'
import Player from '../sprites/Player'
import Bonus from '../sprites/bonuses/Bonus'
import { planes } from '../sprites/enemies/planes'
import { boats } from '../sprites/enemies/boats'
import Plane from '../sprites/enemies/planes/Plane'
import Boat from '../sprites/enemies/boats/Boat'
import { width, height } from '../config/config'
import Bullet  from '../sprites/Bullet'

const config = {
  waves: [{
    enemies: [{
      type: 'Plane::Bomber',
      x: 360,
      y: -300,
    },{
      type: 'Plane::Carrier',
      x: 190,
      y: -90,
      bonus: 'Gun'
    }, {
      type: 'Plane::Carrier',
      x: 100,
      y: -100,
    },{
      type: 'Plane::Carrier',
      x: 150,
      y: -160,
    },{
      type: 'Plane::Carrier',
      x: 250,
      y: -190,
    },{
      type: 'Plane::Carrier',
      x: 300,
      y: -200,
    },{
      type: 'Plane::Carrier',
      x: 300,
      y: -300,
    },{
      type: 'Plane::Carrier',
      x: 500,
      y: -900,
    },{
      type: 'Plane::Carrier',
      x: 300,
      y: -600,
    },{
      type: 'Plane::Carrier',
      x: 100,
      y: -100,
    },{
      type: 'Plane::Carrier',
      x: 300,
      y: -500,
    }, {
      type: 'Plane::Carrier',
      x: 500,
      y: -780,
    }, {
      type: 'Plane::Kamikaze',
      x: 600,
      y: -600,
      bonus: 'Shield'
    }, {
      type: 'Plane::Helicopter',
      x: 500,
      y: -100,
      bonus: 'Life'
    }, {
      type: 'Boat::Cruiser',
      y: 250,
      x: -70
    }, {
      type: 'Boat::Cruiser',
      y: 50,
      x: -70
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
      const [namespace, className] = type.split('::')

      if (namespace === 'Plane') {
        let plane = new planes[className](this, otherOptions)
        this.planes.add(plane)
      } else if (namespace === 'Boat') {
        let boat = new boats[className](this, otherOptions)
        this.boats.add(boat)
      }
    })
  }

  updateInfos() {
    this.livesText.setText(this.player.lives.toLocaleString())
    this.scoreText.setText(this.player.score.toLocaleString())
  }

  create() {
    const ocean = this.add.tileSprite(0, 0, width* 2, height *2, 'ocean')
    ocean.setTint(0x030b14)

    this.player = new Player(this, width / 2, height - 100, 'plane')
    this.planes = this.physics.add.group({ runChildUpdate: true, classType: Plane })
    this.boats = this.physics.add.group({ runChildUpdate: true, classType: Boat })
    this.bonuses = this.physics.add.group({ runChildUpdate: true, classType: Bonus })
    this.projectiles = this.physics.add.group({ runChildUpdate: true, classType: Bullet })

    this.clouds = this.add.image(width/2, -600, 'clouds')
    this.clouds.setScale(1).setAngle(-30)
    // this.clouds.setAngle(90)
    this.clouds.setDepth(10)
    this.clouds.setTint(0x65afe3)

    // BAR
    this.add.image(30, 25, 'life-icon').setScale(0.5).setDepth(100)
    this.livesText = this.add.text(42, 15, this.player.lives, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#FFF'
    }).setDepth(100)
    this.scoreText = this.add.text(width - 15, 15, this.player.score, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#FFF',
    }).setDepth(100).setOrigin(1, 0)



    this.startWave()

    // Colliders
    this.physics.add.overlap(this.player, this.planes.getChildren(), (player, enemy) => {
      player.hitBy(enemy)
    })
    this.physics.add.overlap(this.player, this.projectiles.getChildren(), (player, bullet) => {
      player.hitBy(bullet)
    })
    this.physics.add.overlap(this.boats.getChildren(), this.player.bullets.getChildren(), (boat, bullet) => {
      boat.hitBy(bullet)
    })
    this.physics.add.overlap(this.boats.getChildren(), this.player.bullets2.getChildren(), (boat, bullet) => {
      boat.hitBy(bullet)
    })
    this.physics.add.overlap(this.player, this.bonuses.getChildren(), (_, bonus) => {
      bonus.consume()
    })
    this.physics.add.overlap(this.planes.getChildren(), this.player.bullets.getChildren(), (plane, bullet) => {
      plane.hit(bullet)
    })
    this.physics.add.overlap(this.planes.getChildren(), this.player.bullets2.getChildren(), (plane, bullet) => {
      plane.hit(bullet)
    })
    this.physics.add.collider(this.planes)
    this.physics.add.collider(this.bonuses)

    // Particles
    this.hitParticles = this.add.particles('hit')
    this.hitParticles.setDepth(1)
    this.splashParticles = this.add.particles('splash')
    this.bonusParticles = this.add.particles('bonus')
    this.fireParticles = this.add.particles('fire')
    this.fireParticles.setDepth(1)

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
    this.clouds.y += 1
    if (this.clouds.y - this.clouds.height / 2 > height) {
      this.clouds.y = -600
    }
    if (this.planes.getChildren().length <= 2) {
      this.startWave(this)
    }
    this.player.move(this.cursors, time)
    this.updateInfos()
    this.handleGameOver()
  }
}
