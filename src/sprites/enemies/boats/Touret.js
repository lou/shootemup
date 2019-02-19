import Phaser from 'phaser'
import Weapon from '../../Weapon'

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
  }

  preUpdate() {
    const { player } = this.scene

    if (this.armor <= 0) {
      this.setActive(false)
      this.weapon.setActive(false)
      this.scene.events.emit('addScore', this.points)
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
