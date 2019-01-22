import Bonus from './Bonus'

export default class Shield extends Bonus {
  constructor(scene, options = {}) {
    super(scene, { ...options, type: 'shield-icon' })
  }

  consume() {
    this.scene.player.addShield()
    super.consume()
  }
}
