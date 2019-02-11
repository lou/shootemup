import Plane from './Plane'

export default class Helicopter extends Plane {
  constructor(scene, options) {
    super(scene, 'helicopter', {
      speed: 50,
      armor: 20,
      points: 1,
      lights: {
        side: { x: 15, y: 3 },
        bottom: { y: -28 }
      },
      ...options
    })

    this.blades = scene.add.image(this.x, this.y + 5, 'blades')
    this.blades.rotatable = true
    this.add(this.blades)
    this.blades.setDepth(1)
    this.blades.setTint(0x65afe3)

    scene.tweens.add({
      targets: this.blades,
      angle: 360,
      duration: 150,
      repeat: -1
    })
  }

  destroy() {
    this.blades.destroy()
    super.destroy()
  }

  update() {
    this.body.setVelocityY(this.speed)

    const { player } = this.scene

    this.body.setVelocityY(50)
    this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y) - Math.PI/2)

    super.update()
  }
}
