import Vehicle from '../Vehicle'

export default class Boat extends Vehicle {
  constructor(scene, key, options = {}) {
    super(scene, key, { ...options, bodyOffset: 20 })
    this.vehicle.setDepth(0)
    this.lightBottom.setDepth(0)
    this.lightLeft.setDepth(0)
    this.lightRight.setDepth(0)
  }

  destroy() {
    this.scene.boats.remove(this)
    super.destroy()
  }

}
