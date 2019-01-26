import Phaser from 'phaser';
import Plane from './Plane'

export default class Kamikaze extends Plane {
  constructor(scene, options) {
    super(scene, 'kamikaze', {
      speed: 100,
      armor: 60,
      collidable: true,
      lights: {
        side: { x: 18, y: 6 },
        bottom: { y: -19 }
      },
      ...options
    });
  }

  update() {
    const { player } = this.scene

    this.body.setVelocity(0, 0)
    this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y) - 1.5)
    if (Math.round(this.x) < Math.round(player.x) - 5) {
      this.body.setVelocityX(this.speed);
    } else if (Math.round(this.x) > Math.round(player.x)) {
      this.body.setVelocityX(-this.speed);
    }
    if (Math.round(this.y) < Math.round(player.y) - 5) {
      this.body.setVelocityY(this.speed);
    } else if (Math.round(this.y) > Math.round(player.y)) {
      this.body.setVelocityY(-this.speed);
    }
    super.update()
  }
}
