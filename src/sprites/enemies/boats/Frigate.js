import Boat from './Boat'
import Touret from './Touret'

export default class Frigate extends Boat {
  constructor(scene, options) {
    super(scene, 'frigate', {
      speed: 30,
      lights: {
        side: { x: 13, y: 30 },
        bottom: { y: -60 }
      },
      ...options
    });
    this.tourets = [
      new Touret(scene, { x: options.x, y: options.y + 25, fireSpeed: 1000 }),
      new Touret(scene, { x: options.x, y: options.y - 25, fireSpeed: 4000, type: 'missiles',  speed: 400 })
    ]
    this.add(this.tourets)
  }

  update() {
    this.body.setVelocityY(this.speed*0.8)
    this.tourets.forEach(touret => touret.update())
    super.update()
  }
}
