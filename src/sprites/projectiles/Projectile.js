import Phaser from 'phaser'

export default class Pojectile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, key, options) {
    super(scene, 0, 0, key)
    this.force = options.force || 1
    this.lifespan = options.lifespan
    this.explosive = options.explosive
    this.firedAt = null
    this.setDepth(2)
    if (this.explosive) {
      this.explosionParticles = this.scene.add.particles('fire')
      this.explosionEmitter = this.explosionParticles.setDepth(1.9).createEmitter({
        name: 'explosion',
        scale: { start: 0.6, end: 0.6 },
        speed: 10,
        rotate: { min: -180, max: 180 },
        lifespan: { min: 100, max: 600 },
        alpha: { start: 1, end: 0 },
        maxParticles: 10,
        radial: true,
        tint: 0xfffbde,
        on: false
      })
    } else {
      this.hitParticles = this.scene.add.particles('hit')
      this.hitEmitter = this.hitParticles.createEmitter({
        name: 'hit',
        scale: { start: 0.3, end: 0 },
        rotate: { min: -180, max: 180 },
        speed: { min: 10, max: 150 },
        lifespan: 150,
        on: false,
        tint: 0xfff5db,
        blendMode: 'SCREEN'
      })
    }
  }

  hit(enemy) {
    if (enemy.active) {
      enemy.armor -= this.force
      this.scene.events.emit('addScore', 1)
      this.hitParticles.setDepth(enemy.depth + 1)
      this.hitEmitter.explode(1, this.x, this.y)
      this.setActive(false).setVisible(false)
    }
  }

  fire(shooter, target, options = { speed: 1000 }) {
    this.setPosition(shooter.x, shooter.y)
    const angle = Math.atan((target.x-this.x) / (target.y-this.y))
    const direction = target.y > this.y ? 1 : -1

    this.setVelocityX(options.speed*Math.sin(angle)*direction)
    this.setVelocityY(options.speed*Math.cos(angle)*direction)

    this.rotation = Phaser.Math.Angle.BetweenPoints(shooter, target) - Math.PI/2
  }

  update(time) {
    if (!this.firedAt)
      this.firedAt = time
    if (this.active.false) {
      this.setVelocity(0, 0)
      this.firedAt = null
    }
    this.scene.destroyOnOutOfBounds(this, false)

    if (this.lifespan && time - this.firedAt >= Phaser.Math.Between(this.lifespan.min, this.lifespan.max)) {
      if (this.explosive) {
        this.explosionEmitter.explode(10, this.x, this.y)
      }
      this.destroy()
    }
  }

  destroy() {
    if (this.explosive) {
      if (this.scene) {
        this.scene.time.delayedCall(500, () => {
          this.explosionParticles.destroy()
        })
      }
    } else {
      this.hitParticles.destroy()
    }
    super.destroy()
  }
}
