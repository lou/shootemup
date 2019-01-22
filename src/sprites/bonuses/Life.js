import Bonus from './Bonus'

export default class Life extends Bonus {
  constructor(scene, options = {}) {
    super(scene, { ...options, type: 'life-icon' })
  }

  consume() {
    this.scene.player.lives += 1
    super.consume()
  }
}
