import Phaser from 'phaser'

export default class Weapon extends Phaser.GameObjects.Zone {
  constructor(scene, options) {
    super(scene, options.x, options.y)
    this.scene = scene
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.type = options.type || 'bullets'
    this.fireSpeed = options.fireSpeed || 1000
    this.speed = options.speed || 200
    this.detectionRange = options.detectionRange || 500
    this.lifespan = options.lifespan
    scene.time.addEvent({
      delay: this.fireSpeed,
      callback: () => {
        const distanceOfPlayer = Phaser.Math.Distance.Between(this.x, this.y, scene.player.x, scene.player.y)

        if (this.active && distanceOfPlayer <= this.detectionRange) {
          this.fire(scene.time.now)
        }
      },
      loop: true
    })
  }

  fire() {
    const { player } = this.scene
    const bullet = this.scene[this.type].get().setVisible(true).setActive(true)

    if (bullet) {
      bullet.fire(
        { x: this.x, y: this.y, offset: 30, rotation: this.rotation },
        { x: player.x, y: player.y },
        { speed: this.speed }
      )
    }
  }
}
