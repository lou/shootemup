import Phaser from 'phaser'

export default class Weapon extends Phaser.GameObjects.Zone {
  constructor(scene, options) {
    super(scene, options.x, options.y)
    this.scene = scene
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.lastFired = 0
    this.type = options.type || 'bullets'
    this.fireSpeed = options.fireSpeed || 1000
    this.speed = options.speed || 200
    this.range = options.range || 500
  }

  fire(time) {
    if (time - this.lastFired > this.fireSpeed) {
      const { player } = this.scene
      const bullet = this.scene[this.type].get().setVisible(true).setActive(true)

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
    const distanceOfPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y)
    if (this.active && distanceOfPlayer <= this.range) {
      this.scene.time.delayedCall(0, () => {
        if (this.scene) {
          this.fire(this.scene.time.now)
        }
      })
    }
  }
}
