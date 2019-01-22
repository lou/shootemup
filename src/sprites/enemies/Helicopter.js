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
    this.blades = scene.add.sprite(options.x, options.y, 'blades')
    this.blades.setTint(0x65afe3)
    scene.tweens.add({
      targets: this.blades,
      angle: 360,
      duration: 400,
      repeat: -1
    });
  }

  destroy() {
    this.blades.destroy()
    super.destroy()
  }

  move() {
    this.blades.x = this.x
    this.blades.y = this.y + 5
    this.setVelocityY(this.speed)
  }
}
