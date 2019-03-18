import Boat from './Boat'
import Touret from './Touret'

export default class Frigate extends Boat {
  constructor(scene, options) {
    super(scene, 'frigate', {
      speed: 30,
      lights: {
        side: { x: 13, y: 30 },
        bottom: { y: -60 },
      },
      ...options,
    })
    this.tourets = [
      new Touret(scene, { x: options.path[0].x - 7, y: options.path[0].y + 25, fireSpeed: 1000 }),
      new Touret(scene, { x: options.path[0].x + 7, y: options.path[0].y + 25, fireSpeed: 1000 }),
      new Touret(scene, {
        x: options.path[0].x,
        y: options.path[0].y - 25,
        fireSpeed: 4000,
        type: 'missiles',
        speed: 400,
      }),
    ]
    this.add(this.tourets)
  }
}
