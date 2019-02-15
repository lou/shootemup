import Phaser from 'phaser'
import Weapon from '../../Weapon'
import { hitEmitter } from '../../projectiles/Projectile'
import { width, height } from '../../../config/config'

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

export default class Touret extends Phaser.Physics.Arcade.Image {
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
    this.weapon = new Weapon(scene, options)
  }

  hitBy(bullet) {
    if (this.armor >= 0) {
      this.scene.hitParticles.createEmitter(hitEmitter(bullet))
      this.armor -= bullet.force
      this.scene.player.score += 1
      bullet.setActive(false).setVisible(false)
    }
  }

  preUpdate() {
    const { player } = this.scene

    if (this.armor <= 0) {
      this.setActive(false)
      this.weapon.setActive(false)
      if (!this.fireEmitter) {
        this.fireEmitter = this.scene.fireParticles.createEmitter(fireEmitter(this))
      }
      this.scene.player.score += this.points
    } else {
      this.setRotation(
        Phaser.Math.Angle.Between(player.x, player.y, this.x, this.y) + Math.PI/2
      )
    }
    this.weapon.x = this.x
    this.weapon.y = this.y
  }

  destroy() {
    this.weapon.destroy()
    super.destroy()
  }
}
