import Projectile from './Projectile'

export default class ExplosiveBullet extends Projectile {
  constructor(scene) {
    super(scene, 'bullet', {
      force: 1,
      lifespan: { min: 2000, max: 5500 },
      explosive: true,
    })
    this.setScale(0.9)
  }
}
