import Vehicle from '../Vehicle'
import { bonuses }  from '../../bonuses'
import { hitEmitter } from '../../projectiles/Projectile'

const splashEmitter = (object) => {
  return ({
    x: object.x,
    y: object.y,
    scale: { start: 0.2, end: 1 },
    alpha: { start: 1, end: 0 },
    rotate: { min: -180, max: 180 },
    blendMode: 'ADD',
    maxParticles: 15,
    radial: true,
    speed: 1,
    lifespan: 2000,
    tint: 0x20567c,
    deathCallback: (explosion) => {
      explosion.emitter.stop()
    }
  })
}

export default class Plane extends Vehicle {
  constructor(scene, key, options = {}) {
    super(scene, key, options)
    this.armor = options.armor || 20
    this.points = parseInt(this.armor)
    this.bonus = options.bonus || false
    this.enemyParticles = scene.add.particles(key)
    this.vehicle.setDepth(1)
    this.lightBottom.setDepth(1)
    this.lightLeft.setDepth(1)
    this.lightRight.setDepth(1)
  }

  update() {
    super.update()
    const scene = this.scene

    if (this.armor <= 0) {
      this.enemyParticles.createEmitter({
        x: this.x,
        y: this.y,
        scale: { start: 1, end: 0.5 },
        rotate: { min: -45, max: 90 },
        blendMode: 'ADD',
        maxParticles: 1,
        speed: 100,
        lifespan: 800,
        tint: 0x20567c,
        deathCallback: (explosion) => {
          scene.splashParticles.createEmitter(splashEmitter(explosion));
          explosion.emitter.stop()
        }
      })
      this.destroy()
    }
  }

  destroy() {
    this.scene.planes.remove(this)
    this.scene.player.score += this.points
    if (this.bonus) {
      const bonus = new bonuses[this.bonus](this.scene, { x: this.x, y: this.y })

      this.scene.bonuses.add(bonus)
    }
    super.destroy()
  }

  hitBy(bullet) {
    this.armor -= bullet.force
    this.scene.player.score += 1
    this.scene.hitParticles.createEmitter(hitEmitter(bullet))
    bullet.destroy()
  }

  addLights() {
    this.lightBottom = this.scene.add.sprite(this.x, this.y + this.lights.bottom.y, 'light')
    this.scene.tweens.add({
      targets: this.lightBottom,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    });
    this.lightLeft = this.scene.add.sprite(this.x + this.lights.side.x, this.y + this.lights.side.y, 'light')
    this.lightLeft.setTint(0xff0505)
    this.scene.tweens.add({
      targets: this.lightLeft,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    });
    this.lightRight = this.scene.add.sprite(this.x  - this.lights.side.x, this.y + this.lights.side.y, 'light')
    this.lightRight.setTint(0x40ff00)
    this.scene.tweens.add({
      targets: this.lightRight,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    });

  }
}
