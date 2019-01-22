import Enemy from './Enemy'

export default class Carrier extends Enemy {
  constructor(scene, options) {
    super(scene, 'carrier', {
      speed: 50,
      armor: 60,
      ...options
    });
  }

  move() {
    this.body.immovable = true
    this.setVelocityY(this.speed)
  }
}
