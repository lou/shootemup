import Phaser from 'phaser'

export default class Weapon extends Phaser.GameObjects.Zone {
  constructor(scene, options) {
    super(scene, options.x, options.y)
    this.scene = scene
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.lastFired = 0
    this.fireSpeed = options.fireSpeed || 1000
    this.type = options.type || 'bullets'
    this.speed = options.speed || 200
  }

  fire(time) {
    if (time - this.lastFired > this.fireSpeed) {
      const { player } = this.scene
      const bullet = this.scene[this.type].get()

      if (bullet) {
        bullet.fire(
          { x: this.x, y: this.y, offset: 30, rotation: this.rotation },
          { x: player.x, y: player.y },
          { speed: this.speed }
        )
      }
      this.lastFired = time
    }
  }

  preUpdate() {
    if (this.active) {
      this.scene.time.delayedCall(0, () => {
        if (this.scene) {
          this.fire(this.scene.time.now)
        }
      })
    }
  }
}
