import Projectile from './Projectile'

const smokeEmitter = (object) => {
  return ({
    x: object.x,
    y: object.y,
    scale: { start: 0.035, end: 0.035 },
    alpha: { start: 1, end: 0 },
    rotate: { min: -180, max: 180 },
    blendMode: 'ADD',
    maxParticles: 3,
    lifespan: object.lifespan,
    tint: 0xb6d2f0,
    deathCallback: (explosion) => {
      explosion.emitter.stop()
    }
  })
}

export default class Missile extends Projectile {
  constructor(scene) {
    super(scene, 'missile', {
      force: 10,
    })
    this.firedAt = 0
    this.setTint(0x20567c)
    this.smokeEmitter
  }

  update(time) {
    if (!this.smokeEmitter)
      this.firedAt = time
    this.smokeEmitter = smokeEmitter({
      x: this.x,
      y: this.y,
      lifespan: time - this.firedAt < 50 ? 500 : 250,
      rotation: this.rotation
    })
    this.scene.smokeParticles.createEmitter(this.smokeEmitter)
    super.update()
  }
}
