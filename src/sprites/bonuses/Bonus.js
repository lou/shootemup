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

export default class Bonus extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, options = {}) {
    super(scene, options.x, options.y, 'bonus')
    this.scene = scene
    this.speed = options.speed || 50
    this.image = scene.add.sprite(options.x, options.y, options.type)
    this.image.setScale(0.6)
    scene.add.existing(this)
  }

  update() {
    this.setCircle(this.width/2)
    this.setScale(0.5)
    this.rotation += 0.01
    this.move()
    if (this.y > height || this.x < -this.width || this.x > width)
      this.delete()
  }

  move() {
    this.setVelocityY(this.speed)
    this.image.x = this.x + 1
    this.image.y = this.y + 1
  }

  delete() {
    this.image.destroy()
    if (this.scene)
      this.scene.bonuses.remove(this)
    this.destroy()
  }

  consume() {
    this.scene.bonusParticles.createEmitter(consumeEmitter(this));
    this.delete()
  }
}
