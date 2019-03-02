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

    this.scene = scene
    this.speed = options.speed
    this.started = false
    this.lights = {
      bottom: { y: -25 },
      side: { y: -6, x: 25 },
      duration: Phaser.Math.Between(900, 1900),
      ...options.lights
    }
    this.vehicle = scene.add.image(this.x, this.y, key)
    this.vehicle.setTint(0x20567c)
    this.addLights()
    this.add([this.vehicle, this.lightBottom, this.lightLeft, this.lightRight])
    scene.physics.world.enable(this)
    this.body.setCircle(Math.max(this.vehicle.width / 2, this.vehicle.height / 2) + bodyOffset / 2)
    scene.add.existing(this)

    if (options.path.length > 2) {
      const curve = new Phaser.Curves.Spline(options.path)
      const graphics = scene.add.graphics()
      graphics.lineStyle(1, 0xffffff, 1)
      curve.draw(graphics, 100)
      graphics.fillStyle(0x00ff00, 0.5)
      for (var i = 0; i < curve.points.length; i++)
      {
          graphics.fillCircle(curve.points[i].x, curve.points[i].y, 10);
      }
      this.follower = scene.add.follower(curve, options.path[0], options.path[1], key);
      const duration = curve.getLength() / this.speed * 1000
      this.follower.startFollow({
        duration: duration,
        rotateToPath: true,
        rotationOffset: -90,
        // yoyo: true,
        // repeat: -1
      })
      this.follower.setVisible(false)
    }
  }

  update() {
    this.scene.destroyOnOutOfBounds(this)
    if (this.follower) {
      this.x = this.follower.x
      this.y = this.follower.y
      this.rotation = this.follower.rotation
    }
  }

  addLights() {
    this.lightBottom = this.scene.add.image(this.x, this.y + this.lights.bottom.y, 'light')
    this.scene.tweens.add({
      targets: this.lightBottom,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    })
    this.lightLeft = this.scene.add.image(this.x + this.lights.side.x, this.y + this.lights.side.y, 'light')
    this.lightLeft.setTint(0xff0505)
    this.scene.tweens.add({
      targets: this.lightLeft,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    })
    this.lightRight = this.scene.add.image(this.x  - this.lights.side.x, this.y + this.lights.side.y, 'light')
    this.lightRight.setTint(0x40ff00)
    this.scene.tweens.add({
      targets: this.lightRight,
      alpha: 0.1,
      duration: this.lights.duration,
      repeat: -1,
      yoyo: true
    })

  }
}
