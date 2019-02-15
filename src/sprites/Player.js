import Phaser from 'phaser'
import Bullet  from './projectiles/Bullet'

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
    this.lives = 30
    this.score = 0
    this.shield = false
    this.guns = 1
    this.invincible = false
    this.thrust = scene.add.particles('thrust').createEmitter({
      x: this.x - 2,
      y: this.y + 24,
      scale: { start: 2, end: 0 },
      blendMode: 'ADD',
      on: true,
      maxParticles: 100,
      speed: 15
    })

    this.bullets1 = scene.physics.add.group({ classType: Bullet, runChildUpdate: true }).setDepth(2)
    this.bullets2 = scene.physics.add.group({ classType: Bullet, runChildUpdate: true }).setDepth(2)
    this.bullets = scene.physics.add.group([this.bullets1, this.bullets2])

    this.shieldSprite = this.scene.add.sprite(x, y, 'shield')

    // TWEENS
    this.invincibleAnimation = scene.tweens.add({
      targets: this,
      alpha: 0.1,
      duration: 300,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        this.invincible = false
      }
    });
    this.invincibleAnimation.pause()

    this.shieldAnimation = scene.tweens.add({
      targets: this.shieldSprite,
      alpha: 0.1,
      angle: 360,
      duration: 2000,
      repeat: -1,
      yoyo: true
    });
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

  takeLife() {
    this.lives -= 1
    this.invincible = true

    // Add a delay call to prevent Tween not calling restart immediatly
    this.scene.time.delayedCall(0, () => {
      this.invincibleAnimation.restart()
    })
  }

  hitBy(object) {
    if (!this.invincible) {
      object.armor -= 20
      if (this.shield) {
        this.shield = false
        this.invincible = true
        this.scene.time.delayedCall(
          600,
          _ => {
            this.invincible = false
          }
        )
      }
      else
        this.takeLife()
    }
  }

  fireGun(bullets, offset = { x: 0, y: 0 }) {
    let bullet = bullets.get().setActive(true).setVisible(true)

    if (bullet) {
      bullet.fire(
        { x: this.x + this.angle + offset.x, y: this.y - 30 + offset.y, rotation: this.rotation },
        { x: this.x + offset.x, y: - 10 + offset.y }
      )
    }
  }

  fire() {
    if (this.guns > 1){
      this.fireGun(this.bullets1, { x: +5, y: 5 })
      this.fireGun(this.bullets2, { x: -5, y: 5 })
    } else {
      this.fireGun(this.bullets1)
    }
  }

  move(cursors, time) {
    this.setAcceleration(0, 0)
    const acceleration = 2000
    const deceleration = 10

    this.setAngle(0)
    this.thrust.setLifespan(100)
    this.thrust.setPosition(this.x - 2, this.y + 24)
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

    if (this.body.velocity.y >= 0)
      this.thrust.setLifespan(1)

    if (cursors.space.isDown) {
      this.fire()
    }

    this.shieldSprite.setActive(this.shield).setVisible(this.shield)
    this.moveShield()
  }
}
