import Phaser from 'phaser'


const fireEmitter = (object) => ({
  scale: { start: 0.6, end: 0.6 },
  speed: 10,
  rotate: { min: -180, max: 180 },
  lifespan: { min: 100, max: 500 },
  alpha: { start: 1, end: 0 },
  maxParticles: 10,
  radial: true,
  x: object.x,
  y: object.y,
  tint: 0xfffbde
})

export const hitEmitter = object => ({
  x: object.x,
  y: object.y,
  scale: { start: 0.3, end: 0 },
  rotate: { min: -180, max: 180 },
  maxParticles: 2,
  speed: 150,
  lifespan: 100,
  deathCallback: (hit) => {
    hit.emitter.stop()
  }
})

export default class Pojectile extends Phaser.Physics.Arcade.Image {
  constructor(scene, key, options) {
    super(scene, 0, 0, key)
    this.force = options.force || 1
    this.lifespan = options.lifespan
    this.explosive = options.explosive
    this.firedAt = null
    this.setDepth(2)
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
        this.scene.fireParticles.setDepth(1.9).createEmitter(fireEmitter(this))
        this.destroy()
      }
    }
  }
}
