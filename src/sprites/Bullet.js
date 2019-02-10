import Phaser from 'phaser'
import { width, height } from '../config/config'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'bullet')
    this.force = 1
    this.tint = 0xfeecca
    this.setScale(1)
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
    if (this.y > height || this.y < 0 || this.x < -this.width || this.x > width) {
      this.destroy()
    }
  }
}
