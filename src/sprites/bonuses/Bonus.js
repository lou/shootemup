import Phaser from 'phaser'

export default class Bonus extends Phaser.Physics.Arcade.Image {
  constructor(scene, options = {}) {
    super(scene, options.x, options.y, 'bonus')
    this.scene = scene
    this.speed = options.speed || 50
    this.image = scene.add.sprite(options.x, options.y, options.type)
    this.image.setScale(0.6).setDepth(4)
    this.started = true
    this.setDepth(4.1)
    scene.add.existing(this)
    this.bonusParticles = this.scene.add.particles('bonus').setDepth(2)
    this.bonusEmitter = this.bonusParticles.createEmitter({
      name: 'bonus',
      scale: { start: 0.3, end: 0.1 },
      rotate: { min: -180, max: 180 },
      alpha: { start: 1, end: 0.5 },
      speed: { min: 20, max: 100 },
      on: false,
      radius: true,
      lifespan: 700,
      deathCallback: () => this.bonusParticles.destroy(),
    })
  }

  update() {
    this.setCircle(this.width / 2)
    this.setScale(0.5)
    this.rotation += 0.01
    this.setVelocityY(this.speed)
    this.image.x = this.x + 1
    this.image.y = this.y + 1
    this.scene.destroyOnOutOfBounds(this)
  }

  destroy() {
    this.image.destroy()
    super.destroy()
  }

  consume() {
    this.bonusEmitter.explode(10, this.x, this.y)
    this.destroy()
  }
}
