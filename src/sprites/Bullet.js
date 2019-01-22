import Phaser from 'phaser'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'bullet')
    this.scene = scene
    this.speed = 1
    this.born = 0
    this.direction = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.tint = 0xfeecca
    this.force = 1
    this.setScale(1.2)
  }

  fire(shooter, target) {
    this.setPosition(shooter.x, shooter.y)
    this.direction = Math.atan((target.x-this.x) / (target.y-this.y))

    if (target.y >= this.y) {
      this.xSpeed = this.speed*Math.sin(this.direction)
      this.ySpeed = this.speed*Math.cos(this.direction)
    } else {
      this.xSpeed = -this.speed*Math.sin(this.direction)
      this.ySpeed = -this.speed*Math.cos(this.direction)
    }

    this.rotation = shooter.rotation
    this.born = 0
  }

  update(time, delta) {
    this.x += this.xSpeed * delta
    this.y += this.ySpeed * delta
    this.born += delta
    if (this.born > 700) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}
