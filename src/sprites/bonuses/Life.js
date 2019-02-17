import Bonus from './Bonus'

export default class Life extends Bonus {
  constructor(scene, options = {}) {
    super(scene, { ...options, type: 'life-icon' })
    this.image.setTint(0xff5252)
  }

  consume() {
    this.scene.player.lives += 1
    super.consume()
  }
}
