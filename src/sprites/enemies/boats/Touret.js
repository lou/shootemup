import Phaser from 'phaser'
import Weapon from '../../Weapon'
import { hitConfig } from '../../projectiles/Projectile'

export default class Touret extends Phaser.Physics.Arcade.Image {
  constructor(scene, options) {
    super(scene, options.x, options.y, 'touret')
    scene.add.existing(this)
    scene.physics.world.enable(this)
    scene.tourets.add(this)
    this.armor = 120
    this.points = parseInt(this.armor)
    this.body.setCircle(this.width/2)
    this.setOrigin(0.5)
      .setDepth(1.5)
      .setTint(0x20567c)
      .setScale(1.3)
    this.rotatable = true
    this.weapon = new Weapon(scene, { ...options, lifespan: 500 })
    this.smokeParticles = this.scene.add.particles('smoke')
    this.smokeEmitter = this.smokeParticles.setDepth(2.2).createEmitter({
      name: 'smoke',
      blendMode: 'SCREEN',
      scale: { start: 0.1, end: 0.3 },
      speed: 10,
      rotate: { min: -90, max: 90 },
      lifespan: 3000,
      alpha: { start: 0.15, end: 0 },
      maxParticles: 1,
      radial: true,
      tint: 0xfffbde,
      on: false,
      follow: this,
      frequency: 50,
      maxParticles: 1,
      tint: 0x65afe3
    }).reserve(100)
    this.hitParticles = this.scene.add.particles('hit').setDepth(1.6)
    this.hitEmitter = this.hitParticles.createEmitter(hitConfig)

  }

  preUpdate() {
    const { player } = this.scene

    if (this.armor <= 0) {
      this.setActive(false)
      this.weapon.setActive(false)
      this.scene.events.emit('addScore', this.points)
      this.smokeEmitter.start()
      this.hitParticles.destroy()
    } else {
      this.setRotation(
        Phaser.Math.Angle.Between(player.x, player.y, this.x, this.y) + Math.PI/2
      )
      this.weapon.x = this.x
      this.weapon.y = this.y
    }
  }

  destroy() {
    this.weapon.destroy()
    this.smokeParticles.destroy()
    super.destroy()
  }
}
