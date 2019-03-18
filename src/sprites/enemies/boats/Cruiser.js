import Boat from './Boat'
import Touret from './Touret'

export default class Cruiser extends Boat {
  constructor(scene, options) {
    super(scene, 'cruiser', {
      speed: 40,
      lights: {
        side: { x: 7, y: 30 },
        bottom: { y: -38 },
      },
      ...options,
    })
    this.tourets = [
      new Touret(scene, { x: options.path[0].x, y: options.path[0].y + 15, fireSpeed: 1000 }),
    ]
    this.add(this.tourets)
  }
}
