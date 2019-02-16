import Vehicle from '../Vehicle'

export default class Boat extends Vehicle {
  constructor(scene, key, options = {}) {
    super(scene, key, { ...options, bodyOffset: 20 })
    this.vehicle.setDepth(1)
    this.lightBottom.setDepth(1)
    this.lightLeft.setDepth(1)
    this.lightRight.setDepth(1)
    this.tourets = []
  }

  destroy() {
    this.scene.boats.remove(this)
    super.destroy()
  }

}
