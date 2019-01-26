import Vehicle from '../Vehicle'
import { bonuses }  from '../../bonuses'

const hitEmitter = object => ({
  x: object.x,
  y: object.y,
  scale: { start: 0.2, end: 0 },
  rotate: { start: 0, end: 90 },
  alpha: { start: 1, end: 0.1 },
  blendMode: 'ADD',
  on: true,
  maxParticles: 3,
  speed: 150,
  lifespan: 100,
  deathCallback: (explosion) => {
    explosion.emitter.stop()
  }
})

const explosionEmitter = (object) => {
  return ({
    x: object.x,
    y: object.y,
    scale: { start: 1, end: 0 },
    rotate: { start: 0, end: 65 },
    alpha: { start: 1, end: 0 },
    blendMode: 'ADD',
    on: true,
    maxParticles: 1000,
    speed: 100,
    lifespan: 400,
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
        rotate: { start: 0, end: 85 },
        blendMode: 'ADD',
        on: true,
        maxParticles: 1,
        speed: 100,
        radius: true,
        lifespan: 500,
        tint: 0x20567c,
        deathCallback: (explosion) => {
          scene.hitParticles.createEmitter(explosionEmitter({ x: explosion.x, y: explosion.y }));
          explosion.emitter.stop()
        }
      })
      this.destroy()
    }
  }

  destroy() {
    this.scene.planes.remove(this)
    if (this.bonus) {
      const bonus = new bonuses[this.bonus](this.scene, { x: this.x, y: this.y })

      this.scene.bonuses.add(bonus)
    }
    super.destroy()
  }

  hit(bullet) {
    this.armor -= bullet.force
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
