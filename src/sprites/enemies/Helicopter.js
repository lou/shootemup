import Enemy from './Enemy'

export default class Helicopter extends Enemy {
  constructor(scene, options) {
    super(scene, 'helicopter', {
      speed: 50,
      armor: 60,
      lights: {
        side: { x: 15, y: -5 },
        bottom: { y: 25 }
      },
      ...options
    })
    this.blades = scene.add.sprite(0, 0, 'blades')
    this.blades.setTint(0x65afe3)
    scene.tweens.add({
      targets: this.blades,
      angle: 360,
      duration: 400,
      repeat: -1
    })
    this.add(this.blades)
  }

  destroy() {
    this.blades.destroy()
    super.destroy()
  }

  move() {
    // this.blades.x = this.x
    // this.blades.y = this.y + 5
    // this.body.setVelocityY(this.speed)
    const { player } = this.scene

    this.body.setVelocity(0, 0);
    this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y))
    if (Math.round(this.x) < Math.round(player.x) - 5) {
      this.body.setVelocityX(this.speed);
    } else if (Math.round(this.x) > Math.round(player.x)) {
      this.body.setVelocityX(-this.speed);
    }
    if (Math.round(this.y) < Math.round(player.y) - 5) {
      this.body.setVelocityY(this.speed);
    } else if (Math.round(this.y) > Math.round(player.y)) {
      this.body.setVelocityY(-this.speed);
    }
  }
}
