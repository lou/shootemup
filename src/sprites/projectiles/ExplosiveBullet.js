import Projectile from './Projectile'

export default class ExplosiveBullet extends Projectile {
  constructor(scene) {
    super(scene, 'bullet', {
      force: 1,
      lifespan: { min: 1000, max: 4000 },
      explosive: true
    })
    this.setScale(0.9)
  }
}
