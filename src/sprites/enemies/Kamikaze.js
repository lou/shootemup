import Phaser from 'phaser';
import Enemy from './Enemy'

export default class Kamikaze extends Enemy {
  constructor(scene, options) {
    super(scene, 'kamikaze', {
      speed: 100,
      armor: 60,
      collidable: true,
      lights: {
        side: { x: 18, y: -6 },
        bottom: { y: 19 }
      },
      ...options
    });
  }

  move() {
    const { player } = this.scene

    this.setVelocity(0, 0);
    this.setAngle(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)) - 90)
    if (Math.round(this.x) < Math.round(player.x) - 5) {
      this.setVelocityX(this.speed);
    } else if (Math.round(this.x) > Math.round(player.x)) {
      this.setVelocityX(-this.speed);
    }
    if (Math.round(this.y) < Math.round(player.y) - 5) {
      this.setVelocityY(this.speed);
    } else if (Math.round(this.y) > Math.round(player.y)) {
      this.setVelocityY(-this.speed);
    }
  }
}
