import Vehicle from '../Vehicle'
import { bonuses } from '../../bonuses'
import { hitConfig } from '../../projectiles/Projectile'

export default class Plane extends Vehicle {
  constructor(scene, key, options = {}) {
    super(scene, key, options)
    this.armor = options.armor || 20
    this.points = parseInt(this.armor)
    this.bonus = options.bonus || false
    this.enemyParticles = scene.add.particles(key)
    this.splashParticles = scene.add.particles('splash')
    this.shadow = scene.add
      .image(this.x + 10, this.y + 10, key)
      .setScale(0.6)
      .setDepth(1.9)
      .setAlpha(0.5)
      .setTint(0x030b14)
    this.vehicle.setDepth(2)
    this.lightBottom.setDepth(2)
    this.lightLeft.setDepth(2)
    this.lightRight.setDepth(2)
    this.splashEmitter = this.splashParticles.createEmitter({
      name: 'splash',
      scale: { start: 0.1, end: 1 },
      alpha: { start: 1, end: 0 },
      rotate: { min: -180, max: 180 },
      blendMode: 'SCREEN',
      speed: { min: 0, max: 1 },
      tint: 0x20567c,
      on: false,
      deathCallback: () => {
        this.splashParticles.destroy()
      },
    })

    this.enemyEmitter = this.enemyParticles.createEmitter({
      name: 'enemy',
      scale: { start: 1, end: 0.5 },
      rotate: { min: -45, max: 90 },
      blendMode: 'ADD',
      maxParticles: 1,
      speed: 100,
      lifespan: 800,
      tint: 0x20567c,
      on: false,
      deathCallback: particles => {
        this.splashEmitter.explode(30, particles.x, particles.y)
        this.enemyParticles.destroy()
      },
    })
    this.hitParticles = this.scene.add.particles('hit').setDepth(1.6)
    this.hitEmitter = this.hitParticles.createEmitter(hitConfig)
  }

  kill() {
    this.enemyEmitter.setPosition(this.x, this.y).start()
    this.hitParticles.destroy()
    this.scene.events.emit('addScore', this.points)
    if (this.bonus) {
      this.scene.bonuses.add(new bonuses[this.bonus](this.scene, { x: this.x, y: this.y }))
    }
    this.destroy()
  }

  preUpdate() {
    this.shadow.setPosition(this.x - 10, this.y - 10).setRotation(this.rotation)
    if (this.armor <= 0) {
      this.kill()
    }
  }

  destroy() {
    this.scene.planes.remove(this)
    this.shadow.destroy()
    this.hitParticles.destroy()
    super.destroy()
  }
}
