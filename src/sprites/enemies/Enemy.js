import Phaser from 'phaser'
import { width, height } from '../../config/config'
import { bonuses }  from '../bonuses'

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
  radius: true,
  lifespan: 100,
  deathCallback: (explosion) => {
    explosion.emitter.stop()
  }
})

const explosionEmitter = (object) => {
  return ({
    x: object.x,
    y: object.y,
    scale: { start: 2, end: 0 },
    rotate: { start: 0, end: 65 },
    alpha: { start: 1, end: 1 },
    blendMode: 'ADD',
    on: true,
    maxParticles: 40,
    speed: 150,
    radius: true,
    lifespan: 300,
    tint: 0x20567c,
    deathCallback: (explosion) => {
      explosion.emitter.stop()
    }
  })
}

export default class Enemy extends Phaser.GameObjects.Container {
  constructor(scene, key, options = {}) {
    super(scene, options.x, options.y)
    this.scene = scene
    this.speed = options.speed || 100
    this.armor = options.armor || 20
    this.bonus = options.bonus || false
    this.collidable = options.collidable
    this.started = false

    this.lights = {
      bottom: { y: 25 },
      side: { y: 5, x: 25 },
      duration: Phaser.Math.Between(900, 1900),
      ...options.lights
    }
    this.plane = scene.add.sprite(0, 0, key)
    this.plane.setTint(0x20567c)
    this.width = this.plane.width
    this.height = this.plane.height
    this.lightBottom = scene.add.sprite(0, -this.lights.bottom.y, 'light')
    scene.add.existing(this)

    this.add([this.plane, this.lightBottom])
    // scene.world.enable(this)
    // this.body.setCircle(Math.max(this.width/2, this.height/2))
    // this.addLights()
  }

  update() {
    // this.lightBottom.x = this.x
    // this.lightBottom.y = this.y - this.lights.bottom.y
    // this.lightLeft.x = this.x - this.lights.side.x
    // this.lightLeft.y = this.y - this.lights.side.y
    // this.lightRight.x = this.x + this.lights.side.x
    // this.lightRight.y = this.y - this.lights.side.y
    this.move()
    if (this.y >= 0 && !this.started)
      this.started = true
    if (this.started && (this.y > height || this.x < -this.width || this.x > width))
      this.destroy()
    if (this.armor <= 0) {
      this.scene.hitParticles.createEmitter(explosionEmitter(this));
      this.destroy()
    }
  }

  destroy() {
    this.lightBottom.destroy()
    // this.lightLeft.destroy()
    // this.lightRight.destroy()
    this.scene.enemies.remove(this)
    if (this.bonus) {
      const bonus = new bonuses[this.bonus](this.scene, { x: this.x, y: this.y })

      this.scene.bonuses.add(bonus)
    }
    super.destroy()
  }

  hit(bullet) {
    this.armor -= bullet.force
    this.scene.hitParticles.createEmitter(hitEmitter(bullet))
    bullet.destroy()
  }

  addLights() {
    console.log(this)
    this.lightBottom = this.scene.add.sprite(0, this.lights.bottom.y, 'light')
    this.container.add(this.lightBottom)
    // this.scene.tweens.add({
    //   targets: this.lightBottom,
    //   alpha: 0.1,
    //   duration: this.lights.duration,
    //   repeat: -1,
    //   yoyo: true
    // });

    // this.lightLeft = this.scene.add.sprite(-this.lights.side.x, -this.lights.side.y, 'light')
    // this.lightLeft.setTint(0xff0505)
    // this.scene.tweens.add({
    //   targets: this.lightLeft,
    //   alpha: 0.1,
    //   duration: this.lights.duration,
    //   repeat: -1,
    //   yoyo: true
    // });
    // this.lightRight = this.scene.add.sprite(this.lights.side.x, this.lights.side.y, 'light')
    // this.lightRight.setTint(0x40ff00)
    // this.scene.tweens.add({
    //   targets: this.lightRight,
    //   alpha: 0.1,
    //   duration: this.lights.duration,
    //   repeat: -1,
    //   yoyo: true
    // });
    // this.container.add(this.lightBottom)
    // this.container.add(this.lightLeft)
    // this.container.add(this.lightRight)
  }
}
