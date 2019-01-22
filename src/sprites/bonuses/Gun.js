import Bonus from './Bonus'

export default class Gun extends Bonus {
  constructor(scene, options = {}) {
    super(scene, { ...options, type: 'gun-icon' })
  }

  consume() {
    this.scene.player.guns = 2
    super.consume()
  }
}
