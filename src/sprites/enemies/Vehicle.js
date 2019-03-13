import Phaser from 'phaser'
import ContainerLite from '../../plugins/gameobjects/containerlite/ContainerLite'

const pathForEscort = (escort, target, vehicleSize) => {
  const direction = Math.PI/2 + Phaser.Math.Angle.BetweenPoints(target.path[0], target.path[1])
  let offset = vehicleSize + (escort.offset || 10)

  return target.path.map(point => {
    const offsetDirection = ['left', 'top'].includes(escort.position) ? 1 : -1
    let angle = ['top', 'bottom'].includes(escort.position) ? direction + Phaser.Math.DegToRad(90) : direction

    return ({
      x: point.x - offset * offsetDirection * Math.cos(angle),
      y: point.y - offset * offsetDirection * Math.sin(angle)
    })
  })
}

export default class Vehicle extends ContainerLite {
  constructor(scene, key, options) {
    const vehicleImage = scene.textures.get(key).getSourceImage()
    const vehicleSize = Math.max(vehicleImage.width, vehicleImage.height)
    const bodyOffset = options.bodyOffset || 0
    let path = options.path
    let target

    if (options.escort) {
      target = scene[options.escort.targetGroup].getChildren().find(vehicle => vehicle.id === options.escort.targetId)

      path = pathForEscort(options.escort, target, vehicleSize)
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
    this.size = vehicleSize
    this.path = path
    this.keepRotation = options.keepRotation
    this.scene = scene
    this.speed = options.escort ? this.target.speed : options.speed
    this.escort = options.escort
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
    if (this.escort && this.escort.rotateAround) {
      Phaser.Math.RotateAroundDistance(this, this.target.x, this.target.y, 0.015, this.escort.offset || this.target.size)
    } else {
      if (!this.moving && this.path[1]) {
        if (!this.keepRotation) {
          this.setRotation(
            Phaser.Math.Angle.BetweenPoints(this.path[0], this.path[1]) - Math.PI/2
          )
        }
        this.scene.physics.moveTo(this, this.path[1].x, this.path[1].y, this.speed)
        this.moving = true
      }
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
