import Phaser from 'phaser'

const hitEmitter = object => ({
  x: object.x,
  y: object.y,
  scale: { start: 0.2, end: 0 },
  rotate: { start: 0, end: 90 },
  alpha: { start: 1, end: 0.1 },
  blendMode: 'ADD',
  on: true,
  maxParticles: 3,
  speed: 150,
  lifespan: 100,
  deathCallback: (explosion) => {
    explosion.emitter.stop()
  }
})

const fireEmitter = (object) => ({
  scale: { start: 0.2, end: 0.15 },
  speed: 0,
  followOffset: object,
  rotate: { min: -180, max: 180 },
  lifespan: { min: 100, max: 300 },
  blendMode: 'ADD',
  maxParticles: 10,
  x: object.x,
  y: object.y,
  deathCallback: (explosion) => {
    explosion.emitter.stop()
  }
})

export default class Touret extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, options) {
    super(scene, options.x, options.y, 'touret')
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.armor = 30
    this.points = parseInt(this.armor)
    this.body.setCircle(this.width/2)
    this.setOrigin(0.5)
    this.setDepth(0)
    this.rotatable = true
    this.setTint(0x20567c)
    this.lastFired = 0
    this.gunActive = true
    this.fireSpeed = options.fireSpeed || 2000
  }

  hitBy(bullet) {
    if (this.armor >= 0) {
      this.scene.hitParticles.createEmitter(hitEmitter(bullet))
      this.armor -= bullet.force
      this.scene.player.score += 1
      bullet.destroy()
    }
  }

  fire(time) {
    if (time - this.lastFired > this.fireSpeed) {
      const { player } = this.scene
      let bullet = this.scene.projectiles.get().setActive(true).setVisible(true)

      if (bullet) {
        bullet.fire(
          { x: this.x, y: this.y, offset: 30, rotation: this.rotation },
          { x: player.x, y: player.y },
          { speed: 200 }
        )
      }
      this.lastFired = time
    }
  }

  update() {
    const { player } = this.scene

    if (this.armor <= 0) {
      this.gunActive = false
      this.scene.player.score += this.points
      if (!this.fireEmitter) {
        this.fireEmitter = this.scene.fireParticles.createEmitter(fireEmitter(this))
      }
    } else {
      this.setRotation(
        Phaser.Math.Angle.Between(player.x, player.y, this.x, this.y) + Math.PI/2
      )
    }
    if (this.gunActive) {
      this.scene.time.delayedCall(0, () => {
        if (this.scene) {
          this.fire(this.scene.time.now)
        }
      })
    }
  }
}
