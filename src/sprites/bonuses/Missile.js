import Bonus from './Bonus'

export default class Missile extends Bonus {
  constructor(scene, options = {}) {
    super(scene, { ...options, type: 'missile-icon' })
  }

  consume() {
    this.scene.player.missilesActivated = true
    super.consume()
  }
}
