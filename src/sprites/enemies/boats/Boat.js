import Vehicle from '../Vehicle'

export default class Boat extends Vehicle {
  constructor(scene, key, options = {}) {
    super(scene, key, { ...options, bodyOffset: 30 })
    this.vehicle.setDepth(1)
    this.lightBottom.setDepth(1)
    this.lightLeft.setDepth(1)
    this.lightRight.setDepth(1)
    this.tourets = []
    scene.anims.create({
      key: 'ripple',
      frames: [
        { key: 'ripple01' },
        { key: 'ripple02' },
        { key: 'ripple03' },
        { key: 'ripple04' },
        { key: 'ripple05' },
      ],
      frameRate: 8,
      repeat: -1,
    })

    this.ripple = scene.add
      .sprite(options.path[0].x, options.path[0].y, 'ripple01')
      .play('ripple')
      .setScale(options.rippleScale || 1)
      .setTint(0x20567c)
  }

  preUpdate() {
    this.ripple.setPosition(this.x, this.y).setRotation(this.rotation)
  }

  destroy() {
    this.scene.boats.remove(this)
    this.tourets.forEach(touret => touret.destroy())
    super.destroy()
  }
}
