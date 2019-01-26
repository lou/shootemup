import Plane from './Plane'

export default class Bomber extends Plane {
  constructor(scene, options) {
    super(scene, 'bomber', {
      speed: 80,
      armor: 100,
      ...options
    })
  }

  update() {
    this.body.setVelocityY(this.speed)
    super.update()
  }
}
