import Boat from './Boat'
import Touret from './Touret'

export default class Cruiser extends Boat {
  constructor(scene, options) {
    super(scene, 'cruiser', {
      speed: 30,
      lights: {
        side: { x: 7, y: 30 },
        bottom: { y: -38 }
      },
      ...options
    });
    this.tourets = [
      new Touret(scene, { x: options.x, y: options.y + 15, fireSpeed: 1000 }),
    ]
    this.add(this.tourets)
  }

  update() {
    this.setAngle(-60)
    this.body.setVelocityX(this.speed)
      .setVelocityY(this.speed)
      .setImmovable()
    super.update()
  }
}
