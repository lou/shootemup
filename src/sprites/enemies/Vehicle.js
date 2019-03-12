import Phaser from 'phaser'
import ContainerLite from '../../plugins/gameobjects/containerlite/ContainerLite'

export default class Vehicle extends ContainerLite {
  constructor(scene, key, options) {
    const vehicleImage = scene.textures.get(key).getSourceImage()
    const bodyOffset = options.bodyOffset || 0
    let path = options.path
    let target

    if (options.escort) {
      target = scene.planes.getChildren().find(plane => plane.id === options.escort.targetId)
      path = target.path

      const direction = Math.PI/2 + Phaser.Math.Angle.BetweenPoints(target.path[0], target.path[1])

      path = target.path.map(point => {
        if (options.escort.offsetX) {
          return {
            x: point.x - options.escort.offsetX * Math.cos(direction),
            y: point.y - options.escort.offsetX * Math.sin(direction)
          }
        } else if (options.escort.offsetY) {
          return {
            x: point.x - options.escort.offsetY * Math.cos(direction + 1.5708),
            y: point.y - options.escort.offsetY * Math.sin(direction + 1.5708)
          }
        } else {
          return point
        }
      })
    }
    super(
      scene,
      path[0].x,
      path[0].y,
      vehicleImage.width + bodyOffset,
      vehicleImage.height + bodyOffset
    )
    this.id = options.id
    this.target = target
    this.path = path
    this.keepRotation = options.keepRotation
    this.scene = scene
    this.speed = options.speed
    this.lights = {
      bottom: { y: -25 },
      side: { y: -6, x: 25 },
      duration: Phaser.Math.Between(900, 1900),
      ...options.lights
    }
    this.vehicle = scene.add.image(this.path[0].x, this.path[0].y, key)
    this.vehicle.setTint(0x20567c)
    this.addLights()
    this.add([this.vehicle, this.lightBottom, this.lightLeft, this.lightRight])
    scene.physics.world.enable(this)
    this.body.setCircle(Math.max(this.vehicle.width / 2, this.vehicle.height / 2) + bodyOffset / 2)
    scene.add.existing(this)
  }

  update() {
    if (this.target) {
      this.rotation = this.target.rotation
    }
    if (this.path[1]) {
      if (!this.keepRotation) {
        this.setRotation(
          Phaser.Math.Angle.BetweenPoints(this.path[0], this.path[1]) - Math.PI/2
        )
      }
      this.scene.physics.moveTo(this, this.path[1].x, this.path[1].y, this.speed)
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
