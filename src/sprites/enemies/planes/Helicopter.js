import Plane from './Plane'
import Weapon from '../../Weapon'

export default class Helicopter extends Plane {
  constructor(scene, options) {
    super(scene, 'helicopter', {
      speed: 400,
      armor: 100,
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
    this.blades.setDepth(2.1)
    this.blades.setTint(0x65afe3)

    scene.tweens.add({
      targets: this.blades,
      angle: 360,
      duration: 150,
      repeat: -1
    })
    this.add([
      new Weapon(scene, {
        x: options.x,
        y: options.y + 30,
        type: 'missiles',
        fireSpeed: 2000,
        speed: 400
      })
    ])
  }

  destroy() {
    this.blades.destroy()
    super.destroy()
  }

  preUpdate() {
    this.body.setVelocityY(this.speed).setImmovable()

    const { player } = this.scene

    this.body.setVelocityY(50)
    this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y) - Math.PI/2)
  }
}
