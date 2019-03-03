import Phaser from 'phaser';
import Plane from './Plane'

export default class Kamikaze extends Plane {
  constructor(scene, options) {
    super(scene, 'kamikaze', {
      speed: 100,
      armor: 50,
      points: 1,
      collidable: true,
      lights: {
        side: { x: 18, y: 6 },
        bottom: { y: -19 }
      },
      ...options
    });
    this.killOnHit = true
  }

  update() {
    this.setRotation(
      Phaser.Math.Angle.Between(
        this.x, this.y,
        this.scene.player.x, this.scene.player.y
      ) - Math.PI/2
    )
    this.scene.physics.moveTo(this, this.scene.player.x, this.scene.player.y, this.speed)
    super.update()
  }
}
