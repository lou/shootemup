import Phaser from 'phaser'
import Bullet from './projectiles/Bullet'
import Missile from './projectiles/Missile'
import Projectile from './projectiles/Projectile'

export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    this.scene = scene
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.setCollideWorldBounds(true)
    this.setCircle(this.width / 2)
    this.setTint(0x20567c)
    this.speed = 400
    this.setDepth(2)
    this.shadow = scene.add
      .image(this.x + 10, this.y + 10, key)
      .setScale(0.9)
      .setDepth(1.9)
      .setAlpha(0.5)
      .setTint(0x030b14)
    this.shield = false
    this.guns = 1
    this.missilesActivated = false
    this.invincible = false
    this.thruster = scene.add
      .image(this.x, this.y, 'thruster')
      .setScale(0.4)
      .setDepth(1.9)
    scene.tweens.add({
      targets: this.thruster,
      alpha: 0.5,
      duration: 500,
      repeat: -1,
      yoyo: true,
    })
    this.addLights()

    this.bullets1 = scene.physics.add.group({ classType: Bullet, runChildUpdate: true }).setDepth(2)
    this.bullets2 = scene.physics.add.group({ classType: Bullet, runChildUpdate: true }).setDepth(2)
    this.missiles = scene.physics.add
      .group({ classType: Missile, runChildUpdate: true })
      .setDepth(2)
    this.projectiles = scene.physics.add.group([this.bullets1, this.bullets2, this.missiles])

    this.missileLastFire = 1

    this.shieldSprite = this.scene.add.image(x, y, 'bonus')

    // TWEENS
    this.invincibleAnimation = scene.tweens.add({
      targets: this,
      alpha: 0.1,
      duration: 300,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        this.setTint(0x20567c)
        this.invincible = false
      },
    })
    this.invincibleAnimation.pause()

    this.shieldAnimation = scene.tweens.add({
      targets: this.shieldSprite,
      angle: 360,
      duration: 5000,
      repeat: -1,
    })
    this.missilesTimer = this.scene.time.addEvent({
      delay: 800,
      callback: () => {
        if (this.missilesActivated) this.fireMissiles()
      },
      loop: true,
    })
    this.missilesTimer.paused = true
    this.pointer = this.scene.input.activePointer
  }

  moveShield() {
    if (this.shieldSprite) {
      this.shieldSprite.x = this.x
      this.shieldSprite.y = this.y
    }
  }

  addShield() {
    this.shield = true
  }

  downgrade() {
    if (this.missilesActivated) {
      this.missilesActivated = false
    } else {
      this.guns = 1
    }
  }
  takeLife() {
    this.downgrade()
    this.scene.cameras.main.shake(300, 0.01)
    this.scene.events.emit('addLife', -1)
    this.invincible = true

    // Add a delay call to prevent Tween not calling restart immediatly
    this.scene.time.delayedCall(0, () => {
      this.invincibleAnimation.restart()
    })
  }

  hit(onHit) {
    onHit()
    this.setTint(0xff5252)
    if (this.shield) {
      this.shield = false
      this.invincible = true
      this.scene.time.delayedCall(600, _ => {
        this.setTint(0x20567c)
        this.invincible = false
      })
    } else {
      this.takeLife()
    }
  }

  hitBy(object) {
    if (!this.invincible) {
      if (object instanceof Projectile) {
        this.hitByProjectile(object)
      } else {
        this.hitByPlane(object)
      }
    }
  }

  hitByProjectile(projectile) {
    this.hit(() => {
      projectile.destroy()
    })
  }

  hitByPlane(plane) {
    this.hit(() => {
      if (plane.killOnHit) {
        plane.kill()
      } else {
        plane.armor -= 20
      }
    })
  }

  fireGun(bullets, offset = { x: 0, y: 0 }) {
    let bullet = bullets.get()

    bullet.lifespan = { min: 600, max: 600 }
    if (bullet) {
      bullet.fire(
        {
          x: this.x + this.angle + offset.x,
          y: this.y - 40 + offset.y,
          rotation: this.rotation,
        },
        { x: this.x + offset.x, y: -10 + offset.y }
      )
    }
  }

  fireMissiles() {
    let missile = this.missiles.get()

    if (missile) {
      missile.fire(
        {
          x: this.x + 18 * this.missileLastFire,
          y: this.y + 20,
          rotation: this.rotation,
        },
        { x: this.x + 18 * this.missileLastFire, y: 0 }
      )
      this.missileLastFire *= -1
    }
  }

  fire() {
    if (this.guns > 1) {
      this.fireGun(this.bullets1, { x: +5, y: 5 })
      this.fireGun(this.bullets2, { x: -5, y: 5 })
    } else {
      this.fireGun(this.bullets1)
    }
    this.missilesTimer.paused = false
  }

  move(cursors, time) {
    this.shadow.setPosition(this.x + 10, this.y + 10).setRotation(this.rotation)
    this.thruster.setPosition(this.x, this.y + 32)
    this.lightBottom.setPosition(this.x, this.y + 23)
    this.lightLeft.setPosition(this.x - 20, this.y  + 17)
    this.lightRight.setPosition(this.x + 20, this.y + 17)
    this.setVelocity(0, 0)

    const dy = (cursors.up.isDown ? -1 : 0) + (cursors.down.isDown ? 1 : 0)
    const dx = (cursors.left.isDown ? -1 : 0) + (cursors.right.isDown ? 1 : 0)
    let vx
    let vy

    if (dy === 0) {
      vx = this.speed * dx
      vy = 0
    } else if (dx === 0) {
      vx = 0
      vy = this.speed * dy
    } else {
      const rotation = Math.atan2(dy, dx)
      vx = this.speed * Math.cos(rotation)
      vy = this.speed * Math.sin(rotation)
    }
    this.setVelocity(vx, vy)

    if (this.pointer.isDown) {
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.pointer.worldX,
        this.pointer.worldY
      )
      if (distance > 5)
        this.scene.physics.moveTo(this, this.pointer.worldX, this.pointer.worldY, this.speed)
    }

    if (this.body.velocity.x > 0) {
      this.lightRight.setPosition(this.x + 20, this.lightRight.y + 5)
      this.lightLeft.setPosition(this.x - 20, this.lightLeft.y  - 5)
      this.setTexture('plane_right')
    } else if (this.body.velocity.x < 0) {
      this.lightRight.setPosition(this.x + 20, this.lightRight.y - 5)
      this.lightLeft.setPosition(this.x - 20, this.lightLeft.y  + 5)
      this.setTexture('plane_left')
    } else {
      this.setTexture('plane')
    }
    this.fire()

    this.shieldSprite.setActive(this.shield).setVisible(this.shield)
    this.moveShield()
  }

  destroy() {
    if (this.shieldSprite) {
      this.shieldSprite.destroy()
    }
    this.thruster.destroy()
    this.shadow.destroy()
    this.bullets1.destroy()
    this.bullets2.destroy()
    this.missiles.destroy()
    this.projectiles.destroy()
    super.destroy()
  }

  addLights() {
    this.lightBottom = this.scene.add.image(this.x, this.y + 18, 'light').setDepth(2.1)
    this.scene.tweens.add({
      targets: this.lightBottom,
      alpha: 0.1,
      duration: 1500,
      repeat: -1,
      yoyo: true,
    })
    this.lightLeft = this.scene.add.image(
      this.x + 18,
      this.y + 10,
      'light'
    ).setDepth(2.1)
    this.lightLeft.setTint(0xff0505)
    this.scene.tweens.add({
      targets: this.lightLeft,
      alpha: 0.1,
      duration: 1500,
      repeat: -1,
      yoyo: true,
    })
    this.lightRight = this.scene.add.image(
      this.x - 18,
      this.y + 10,
      'light'
    ).setDepth(2.1)
    this.lightRight.setTint(0x40ff00)
    this.scene.tweens.add({
      targets: this.lightRight,
      alpha: 0.1,
      duration: 1500,
      repeat: -1,
      yoyo: true,
    })
  }

}
