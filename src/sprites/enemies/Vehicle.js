import Phaser from 'phaser'
import ContainerLite from '../../plugins/gameobjects/containerlite/ContainerLite'

export default class Vehicle extends ContainerLite {
  constructor(scene, key, options) {
    const vehicleImage = scene.textures.get(key).getSourceImage()
    const bodyOffset = options.bodyOffset || 0

    super(
      scene,
      options.path[0],
      options.path[1],
      vehicleImage.width + bodyOffset,
      vehicleImage.height + bodyOffset
    )
    this.keepRotation = options.keepRotation
    this.path = options.path
    this.scene = scene
    this.speed = options.speed
    this.lights = {
      bottom: { y: -25 },
      side: { y: -6, x: 25 },
      duration: Phaser.Math.Between(900, 1900),
      ...options.lights
    }
    this.vehicle = scene.add.image(options.path[0], options.path[1], key)
    this.vehicle.setTint(0x20567c)
    this.addLights()
    this.add([this.vehicle, this.lightBottom, this.lightLeft, this.lightRight])
    scene.physics.world.enable(this)
    this.body.setCircle(Math.max(this.vehicle.width / 2, this.vehicle.height / 2) + bodyOffset / 2)
    scene.add.existing(this)
  }

  update() {
    if (this.path[2]) {
      if (!this.keepRotation) {
        this.setRotation(
          Phaser.Math.Angle.Between(this.path[0], this.path[1], this.path[2], this.path[3]) - Math.PI/2
        )
      }
      this.scene.physics.moveTo(this, this.path[2], this.path[3], this.speed)
    }
    this.scene.destroyOnOutOfBounds(this)
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
