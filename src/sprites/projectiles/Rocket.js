import Projectile from './Projectile'

export default class Bullet extends Projectile {
  constructor(scene) {
    super(scene, 'bullet', {
      force: 10
    })
  }
}
