import Phaser from 'phaser'
import Player from '../sprites/Player'
import Bonus from '../sprites/bonuses/Bonus'
import { planes } from '../sprites/enemies/planes'
import { boats } from '../sprites/enemies/boats'
import Plane from '../sprites/enemies/planes/Plane'
import Boat from '../sprites/enemies/boats/Boat'
import Touret from '../sprites/enemies/boats/Touret'
import { config, worldWidth, worldHeight } from '../config/config'
import ExplosiveBullet  from '../sprites/projectiles/ExplosiveBullet'
import Missile  from '../sprites/projectiles/Missile'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  pathForEscort(escort, target, vehicleSize = 100) {
    const direction = Math.PI/2 + Phaser.Math.Angle.BetweenPoints(target.path[0], target.path[1])
    let offset = vehicleSize + (escort.offset || 10)

    return target.path.map(point => {
      const offsetDirection = ['left', 'top'].includes(escort.position) ? 1 : -1
      let angle = ['top', 'bottom'].includes(escort.position) ? direction + Phaser.Math.DegToRad(90) : direction

      return ({
        x: point.x - offset * offsetDirection * Math.cos(angle),
        y: point.y - offset * offsetDirection * Math.sin(angle)
      })
    })
  }

  createVehicle(vehicleOptions) {
    const { type, start, escort, ...options } = vehicleOptions
    const [namespace, className] = type.split('::')
    let plane
    let boat

    this.enemiesStarted += 1
    if (namespace === 'Plane') {
      plane = new planes[className](this, options)
      this.planes.add(plane)
    } else if (namespace === 'Boat') {
      boat = new boats[className](this, options)
      this.boats.add(boat)
    }
    if (escort) {
      escort.forEach(escortOptions => {
        const target = plane || boat
        const path = this.pathForEscort(escortOptions, target)
        this.createVehicle({
          ...escortOptions,
          path,
          target,
          speed: target.speed
        })
      })
    }

    if (this.enemiesStarted === this.enemiesCount) {
      this.enemiesStarted = 0
      this.time.delayedCall(6000, () => {
        this.startWave()
      })
    }
  }
  startWave() {
    this.enemiesConfig.forEach(enemyOptions => {
      this.time.delayedCall(enemyOptions.startAt || 0, () => {
        this.createVehicle(enemyOptions)
      })
    })
  }

  create() {
    this.wave = {
      index: 0
    }
    this.scene.launch('Info')
    this.started = true
    this.enemiesStarted = 0
    this.enemiesConfig = config.waves[this.wave.index].enemies
    this.enemiesCount = this.enemiesConfig.reduce((accumulator, enemy) => {
      let count = accumulator + 1
      if (enemy.escort)
        count += enemy.escort.length
      return count
    }, 0)
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight)
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight)

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
    this.hittables = this.physics.add.group([this.bullets, this.missiles, this.planes])

    this.clouds = this.add.image(this.physics.world.bounds.width/2, 500, 'clouds')
      .setScale(1)
      .setDepth(10)
      .setTint(0x65afe3)
    this.cloudsShadow = this.add.image(this.clouds.x, this.clouds.y, 'clouds')
      .setScale(0.8)
      .setDepth(2.1)
      .setTint(0x030b14)
      // .setTint(0xff0000)

    this.physics.add.overlap(this.player, this.hittables.getChildren(), (player, enemy) => {
      if (!player.invincible)
        player.hitBy(enemy)
    })
    this.physics.add.overlap(this.enemies.getChildren(), this.player.projectiles.getChildren(), (enemy, bullet) => {
      if (bullet.active) {
        bullet.hit(enemy)
      }
    })
    this.physics.add.overlap(this.player, this.bonuses.getChildren(), (_, bonus) => {
      bonus.consume()
    })

    this.physics.add.collider(this.boats, this.boats, (boat1, boat2) => {
      boat1.moving = false
      boat2.moving = false
    })
    this.physics.add.collider(this.planes, this.planes, (plane1, plane2) => {
      plane1.moving = false
      plane2.moving = false
    })
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

    this.events.on('shutdown', () => {
      this.events.off('addScore')
      this.events.off('addLife')
    })

    this.startWave()
  }

  destroyOnOutOfBounds(sprite, destroy = true) {
    const size = Math.max(sprite.width, sprite.height)

    if (!sprite.started && (
      sprite.y > 0 &&
      sprite.y < this.physics.world.bounds.height &&
      sprite.x > 0 &&
      sprite.x < this.physics.world.bounds.width
    )) {
      sprite.started = true
    }
    if (sprite.started && (
      sprite.y - size - 0 > this.physics.world.bounds.height ||
      sprite.x - size - 0 > this.physics.world.bounds.width ||
      sprite.y < -size - 0 ||
      sprite.x < -size - 0
    )) {
      sprite.destroy()
    }
  }

  update(time) {
    this.clouds.y += 1.3
    this.cloudsShadow.setPosition(this.clouds.x + 30, this.clouds.y+ 60)
    if (this.clouds.y - this.clouds.height > this.physics.world.bounds.height) {
      this.clouds.y = -600
      this.clouds.setScale(Phaser.Math.Between(0.5, 1.5)).setRotation(Phaser.Math.Between(0, 6))
      this.cloudsShadow.setScale(this.clouds.scaleX).setRotation(this.clouds.rotation)
    }

    this.player.move(this.cursors, time)
  }
}
