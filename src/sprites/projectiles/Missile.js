import Projectile from './Projectile'

export default class Missile extends Projectile {
  constructor(scene) {
    super(scene, 'missile', {
      force: 20,
      speed: 400,
    })
    this.firedAt = 0
    this.setTint(0x65afe3)
    this.smokeParticles = this.scene.add.particles('particle').setDepth(2)
    this.smokeEmitter = this.smokeParticles.createEmitter({
      name: 'missile_trail',
      scale: { start: 0.22, end: 0 },
      alpha: { start: 1, end: 0 },
      rotate: { min: -45, max: 45 },
      lifespan: 400,
      speed: 2,
      on: true,
      follow: this,
    })
  }

  destroy() {
    this.smokeParticles.destroy()
    super.destroy()
  }
}
