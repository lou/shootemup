import Boat from './Boat'

export default class Cruiser extends Boat {
  constructor(scene, options) {
    super(scene, 'cruiser', {
      speed: 100,
      lights: {
        side: { x: 7, y: 30 },
        bottom: { y: -38 }
      },
      ...options
    });
    this.setAngle(-60)
  }

  update() {
    this.body.setVelocityX(10)
    this.body.setVelocityY(10)
    super.update()
  }
}
