import Phaser from 'phaser'
import { width, height } from '../../config/config'

const consumeEmitter = object => ({
  x: object.x,
  y: object.y,
  scale: { start: 0.2, end: 0 },
  rotate: { start: 0, end: 90 },
  alpha: { start: 1, end: 0.5 },
  blendMode: 'ADD',
  on: true,
  maxParticles: 5,
  speed: 100,
  radius: true,
  lifespan: 500,
  deathCallback: (explosion) => {
    explosion.emitter.stop()
  }
})

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
  }

  update() {
    this.setCircle(this.width/2)
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
    this.scene.bonusParticles.createEmitter(consumeEmitter(this));
    this.destroy()
  }
}
