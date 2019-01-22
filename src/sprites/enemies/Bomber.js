import Enemy from './Enemy'

export default class Bomber extends Enemy {
  constructor(scene, options) {
    super(scene, 'bomber', {
      speed: 80,
      armor: 100,
      ...options
    });
  }

  move() {
    this.body.immovable = true
    this.setVelocityY(this.speed);
  }
}
