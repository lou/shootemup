import Plane from './Plane'

export default class Carrier extends Plane {
  constructor(scene, options) {
    super(scene, 'carrier', {
      speed: 50,
      armor: 80,
      points: 1,
      ...options
    })
    this.body.immovable = true
  }

  update() {
    this.body.setVelocityY(this.speed)
    super.update()
  }
}
