import Phaser from 'phaser'

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
  }

  fire(shooter, target, options = { speed: 1000 }) {
    this.setPosition(shooter.x, shooter.y)
    const angle = Math.atan((target.x-this.x) / (target.y-this.y))
    const direction = target.y > this.y ? 1 : -1

    this.setVelocityX(options.speed*Math.sin(angle)*direction)
    this.setVelocityY(options.speed*Math.cos(angle)*direction)

    this.rotation = shooter.rotation
  }

  update() {
    if (this.active.false) {
      this.setVelocity(0, 0)
    }
    this.scene.destroyOnOutOfBounds(this, false)
  }
}
