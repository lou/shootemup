import Projectile from './Projectile'

export default class Missile extends Projectile {
  constructor(scene) {
    super(scene, 'missile', {
      force: 10,
    })
    this.firedAt = 0
    this.setTint(0x65afe3)
    this.smokeParticles = this.scene.add.particles('particle')
    this.smokeEmitter = this.smokeParticles.createEmitter({
      name: 'missile_trail',
      scale: { start: 0.2, end: 0.1 },
      alpha: { start: 1, end: 0 },
      rotate: { min: -45, max: 45 },
      lifespan: 400,
      on: true
    })
  }

  destroy() {
    this.smokeParticles.destroy()
    super.destroy()
  }

  preUpdate() {
    this.smokeEmitter.setPosition(this.x, this.y)
  }
}
