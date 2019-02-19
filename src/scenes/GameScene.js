import Phaser from 'phaser'
import Player from '../sprites/Player'
import Bonus from '../sprites/bonuses/Bonus'
import { planes } from '../sprites/enemies/planes'
import { boats } from '../sprites/enemies/boats'
import Plane from '../sprites/enemies/planes/Plane'
import Boat from '../sprites/enemies/boats/Boat'
import Touret from '../sprites/enemies/boats/Touret'
import { config, width, height } from '../config/config'
import ExplosiveBullet  from '../sprites/projectiles/ExplosiveBullet'
import Missile  from '../sprites/projectiles/Missile'

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
    this.started = true
    this.physics.world.setBounds(0, 0, width*1.5, height*1.5)
    this.cameras.main.setBounds(0, 0, width*1.5, height*1.5)

    this.worldBounds = this.add.zone(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height)
    this.worldBounds.onOverlap = true
    this.worldBounds.setOrigin(0, 0)
    this.physics.world.enable(this.worldBounds)

    const ocean = this.add.tileSprite(0, 0, this.physics.world.bounds.width*2, this.physics.world.bounds.height*2, 'ocean')
    ocean.setTint(0x030b14)

    this.player = new Player(this, this.physics.world.bounds.width / 2, this.physics.world.bounds.height - 100, 'plane')
    this.cameras.main.startFollow(this.player, true, 1, 1)
    this.planes = this.physics.add.group({ runChildUpdate: true, classType: Plane })
    this.boats = this.physics.add.group({ runChildUpdate: true, classType: Boat })
    this.tourets = this.physics.add.group({ runChildUpdate: true, classType: Touret })
    this.enemies = this.physics.add.group([this.tourets, this.planes])
    this.bonuses = this.physics.add.group({ runChildUpdate: true, classType: Bonus })
    this.bullets = this.physics.add.group({ runChildUpdate: true, classType: ExplosiveBullet })
    this.missiles = this.physics.add.group({ runChildUpdate: true, classType: Missile })
    this.projectiles = this.physics.add.group([this.bullets, this.missiles])
    this.destroyables = this.physics.add.group([
      this.planes,
      this.boats,
      this.player.bullets1,
      this.player.bullets2,
      this.bullets,
      this.missiles,
      this.bonuses
    ])

    this.clouds = this.add.image(this.physics.world.bounds.width/2, -600, 'clouds')
      .setScale(1)
      .setAngle(-30)
      .setDepth(10)
      .setTint(0x65afe3)

    // BAR
    this.add.image(30, 43, 'life-icon').setScale(0.6).setDepth(100).setScrollFactor(0)
    this.livesText = this.add.text(45, 30, this.player.lives, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFF'
    }).setDepth(100).setScrollFactor(0)
    this.scoreText = this.add.text(width - 30, 30, this.player.score, {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#FFF',
    }).setDepth(100).setOrigin(1, 0).setScrollFactor(0)
    this.menuText = this.add.text(width / 2, 30, 'MENU', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#000',
      backgroundColor: '#FFF',
      padding: {top:10, left: 20},
    }).setDepth(100)
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setInteractive()
      .setAlpha(0.8)
      .on('pointerdown', () => {
        this.scene.pause()
        this.scene.run('Menu')
      })

    this.startWave()

    // Colliders
    this.physics.add.overlap(this.player, this.planes.getChildren(), (player, enemy) => {
      player.hitByPlane(enemy)
    })
    this.physics.add.overlap(this.player, this.projectiles.getChildren(), (player, projectile) => {
      player.hitByProjectile(projectile)
    })
    this.physics.add.overlap(this.enemies.getChildren(), this.player.bullets.getChildren(), (enemy, bullet) => {
      if (bullet.active) {
        bullet.hit(enemy)
      }
    })
    this.physics.add.overlap(this.player, this.bonuses.getChildren(), (_, bonus) => {
      bonus.consume()
    })

    this.physics.add.overlap(this.worldBounds, this.destroyables.getChildren(), (_, sprite) => {
      sprite.started = true
    })
    this.physics.add.collider(this.planes)
    this.physics.add.collider(this.boats)
    this.physics.add.collider(this.bonuses)

    this.cursors = this.input.keyboard.createCursorKeys()


    this.events.on('resume', () => {
      // Reset cursors
      this.cursors.left.isDown = false
      this.cursors.right.isDown = false
      this.cursors.up.isDown = false
      this.cursors.down.isDown = false
      this.cursors.space.isDown = false
    })
  }

  destroyOnOutOfBounds(sprite, destroy = true) {
    const size = Math.max(sprite.width, sprite.height)

    if (sprite.started && (
      sprite.y - size > this.physics.world.bounds.height ||
      sprite.x - size > this.physics.world.bounds.width ||
      sprite.y < -size ||
      sprite.x < -size)
    ) {
      if (destroy) {
        sprite.destroy()
      }
      else {
        sprite.setVisible(false).setActive(false)
      }
    }
  }

  handleGameOver() {
    if (!this.player.lives) {
      // Since there is a weird bug on nested groups
      // We manually destroy them before launching Game Over scene
      this.player.bullets.destroy()
      this.enemies.destroy()
      this.projectiles.destroy()
      this.destroyables.destroy()
      this.scene.stop('Pause')
      this.scene.start('GameOver')
    }
  }

  update(time) {
    this.clouds.y += 1
    if (this.clouds.y - this.clouds.height > this.physics.world.bounds.height) {
      this.clouds.y = -600
    }

    if (this.planes.getChildren().length <= 3) {
      this.startWave(this)
    }
    this.player.move(this.cursors, time)
    this.updateInfos()
    this.handleGameOver()
  }
}
