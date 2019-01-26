import Phaser from 'phaser'
import { width, height } from '../../config/config'
import ContainerLite from '../../plugins/gameobjects/containerlite/ContainerLite'

export default class Vehicle extends ContainerLite {
  constructor(scene, key, options) {
    const vehicleImage = scene.textures.get(key).getSourceImage()
    const bodyOffset = options.bodyOffset || 0

    super(
      scene,
      options.x,
      options.y,
      vehicleImage.width + bodyOffset,
      vehicleImage.height + bodyOffset
    )

    this.scene = scene
    this.speed = options.speed
    this.started = false
    this.lights = {
      bottom: { y: -25 },
      side: { y: -6, x: 25 },
      duration: Phaser.Math.Between(900, 1900),
      ...options.lights
    }
    this.vehicle = scene.add.image(options.x, options.y, key)
    this.vehicle.setTint(0x20567c)
    this.addLights()
    this.add([this.vehicle, this.lightBottom, this.lightLeft, this.lightRight])
    scene.physics.world.enable(this)
    this.body.setCircle(Math.max(this.vehicle.width / 2, this.vehicle.height / 2) + bodyOffset / 2)
    scene.add.existing(this)
  }

  update() {
    if (this.y >= 0 && this.x >= 0 && !this.started)
      this.started = true
    if (this.started && (this.y > height || this.x < -this.width || this.x > width))
      this.destroy()
  }

  addLights() {
    this.lightBottom = this.scene.add.image(this.x, this.y + this.lights.bottom.y, 'light')
    this.scene.tweens.add({
      targets: this.lightBottom,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    });
    this.lightLeft = this.scene.add.image(this.x + this.lights.side.x, this.y + this.lights.side.y, 'light')
    this.lightLeft.setTint(0xff0505)
    this.scene.tweens.add({
      targets: this.lightLeft,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    });
    this.lightRight = this.scene.add.image(this.x  - this.lights.side.x, this.y + this.lights.side.y, 'light')
    this.lightRight.setTint(0x40ff00)
    this.scene.tweens.add({
      targets: this.lightRight,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    });

  }
}
