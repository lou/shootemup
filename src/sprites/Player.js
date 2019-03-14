import Phaser from 'phaser'
import Bullet  from './projectiles/Bullet'
import Missile  from './projectiles/Missile'
import Projectile from './projectiles/Projectile'

export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    this.scene = scene
    scene.add.existing(this)
    scene.physics.world.enable(this)
    this.setCollideWorldBounds(true)
    this.setCircle(this.width/2)
    this.setMaxVelocity(250, 300)
    this.setTint(0x20567c)
    this.setDepth(2)
    this.shadow = scene.add.image(this.x+10, this.y+10, key)
      .setScale(0.9)
      .setDepth(1.9)
      .setAlpha(0.5)
      .setTint(0x030b14)
    this.shield = false
    this.guns = 1
    this.missilesActivated = false
    this.invincible = false
    this.thruster = scene.add.image(this.x, this.y, 'thruster').setScale(0.5).setDepth(1.9)

    this.bullets1 = scene.physics.add.group({ classType: Bullet, runChildUpdate: true }).setDepth(2)
    this.bullets2 = scene.physics.add.group({ classType: Bullet, runChildUpdate: true }).setDepth(2)
    this.missiles = scene.physics.add.group({ classType: Missile, runChildUpdate: true }).setDepth(2)
    this.projectiles = scene.physics.add.group([this.bullets1, this.bullets2, this.missiles])

    this.missileLastFire = 1

    this.shieldSprite = this.scene.add.sprite(x, y, 'bonus').setScale(0.8)

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
      }
    });
    this.invincibleAnimation.pause()

    this.shieldAnimation = scene.tweens.add({
      targets: this.shieldSprite,
      angle: 360,
      duration: 5000,
      repeat: -1,
    });
    this.missilesTimer = this.scene.time.addEvent({
      delay: 800,
      callback: () => {
        if (this.missilesActivated) this.fireMissiles()
      },
      loop: true
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
      this.scene.time.delayedCall(
        600,
        _ => {
          this.setTint(0x20567c)
          this.invincible = false
        }
      )
    }
    else {
      this.takeLife()
    }
  }

  hitBy(object) {
    if (object instanceof Projectile) {
      this.hitByProjectile(object)
    } else {
      this.hitByPlane(object)
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
        { x: this.x + this.angle + offset.x, y: this.y - 30 + offset.y, rotation: this.rotation },
        { x: this.x + offset.x, y: - 10 + offset.y }
      )
    }
  }

  fireMissiles() {
    let missile = this.missiles.get()

    if (missile) {
      missile.fire(
        { x: this.x + 18 * this.missileLastFire, y: this.y + 20, rotation: this.rotation },
        { x: this.x + 18 * this.missileLastFire, y: 0 }
      )
      this.missileLastFire *= -1
    }
  }

  fire() {
    if (this.guns > 1){
      this.fireGun(this.bullets1, { x: +5, y: 5 })
      this.fireGun(this.bullets2, { x: -5, y: 5 })
    } else {
      this.fireGun(this.bullets1)
    }
    this.missilesTimer.paused = false
  }

  move(cursors, time) {
    this.setAcceleration(0, 0)
    const acceleration = 2000
    const deceleration = 10

    this.shadow.setPosition(this.x + 10, this.y + 10).setRotation(this.rotation)
    this.setAngle(0)
    this.thruster.setPosition(this.x, this.y + 25)
    if (cursors.up.isDown) {
      this.setAccelerationY(-acceleration)
    } else if (cursors.down.isDown) {
      this.setAccelerationY(acceleration)
    } else {
      if (this.body.velocity.y > 0)
        this.body.velocity.y = Math.max(0, this.body.velocity.y - deceleration)
      else if (this.body.velocity.y < 0)
        this.body.velocity.y = Math.min(0, this.body.velocity.y + deceleration)
    }

    if (cursors.left.isDown) {
      this.setAccelerationX(-acceleration)
      this.setAngle(5)
    } else if (cursors.right.isDown) {
      this.setAccelerationX(acceleration)
      this.setAngle(-5)
    } else {
      if (this.body.velocity.x > 0)
        this.body.velocity.x = Math.max(0, this.body.velocity.x - deceleration)
      else if (this.body.velocity.x < 0)
        this.body.velocity.x = Math.min(0, this.body.velocity.x + deceleration)
    }

    if (this.pointer.isDown) {
      this.scene.physics.moveTo(this, this.pointer.worldX, this.pointer.worldY, 600)
    }

    this.fire()

    this.shieldSprite.setActive(this.shield).setVisible(this.shield)
    this.moveShield()
  }
}
