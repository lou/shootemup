import Phaser from 'phaser'
import Bar from '../classes/components/Bar'
import { width, height } from '../config/config'

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader')
  }

  preload() {
    const w = Math.min(width, innerWidth)
    const h = Math.min(height, innerHeight)
    // add logo image
    const logo = this.add.image(w / 2, h / 3, 'logo')

    // display progress bar
    this.bar = new Bar({
      scene: this,
      x: w / 2,
      y: h * 0.7,
      color: 0x222222,
    })

    this.progText = this.add.text(w / 2, h * 0.7, '0%', {
      color: '#ffffff',
      fontSize: w / 20,
    })

    this.progText.setOrigin(0.5, 0.5)
    this.load.on('progress', this.onProgress, this)

    // load assets needed in our game
    this.load.image('ocean', 'assets/images/ocean.jpg')
    this.load.image('plane', 'assets/images/rafale.svg')
    this.load.image('plane_right', 'assets/images/rafale_right.svg')
    this.load.image('plane_left', 'assets/images/rafale_left.svg')
    this.load.image('light', 'assets/images/light.png')
    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.image('missile', 'assets/images/missile.png')
    this.load.image('hit', 'assets/images/hit.png')
    this.load.image('splash', 'assets/images/splash.png')
    this.load.image('bonus', 'assets/images/bonus.png')
    this.load.image('life-icon', 'assets/images/bonuses/life.png')
    this.load.image('shield-icon', 'assets/images/bonuses/shield.png')
    this.load.image('gun-icon', 'assets/images/bonuses/bullet.png')
    this.load.image('missile-icon', 'assets/images/bonuses/missile.png')
    this.load.image('kamikaze', 'assets/images/enemies/planes/kamikaze.png')
    this.load.image('carrier', 'assets/images/enemies/planes/carrier.png')
    this.load.image('bomber', 'assets/images/enemies/planes/bomber.png')
    this.load.image('helicopter', 'assets/images/enemies/planes/helicopter/body.png')
    this.load.image('blades', 'assets/images/enemies/planes/helicopter/blades.png')
    this.load.image('clouds', 'assets/images/clouds/clouds.png')
    this.load.image('cruiser', 'assets/images/enemies/boats/cruiser.png')
    this.load.image('frigate', 'assets/images/enemies/boats/frigate.png')
    this.load.image('touret', 'assets/images/enemies/boats/touret.png')
    this.load.image('fire', 'assets/images/fire.png')
    this.load.image('smoke', 'assets/images/smoke.png')
    this.load.image('particle', 'assets/images/particle.png')
    this.load.image('thruster', 'assets/images/thruster.png')

    this.load.image('ripple01', 'assets/images/enemies/boats/water_ripple_medium_000.png')
    this.load.image('ripple02', 'assets/images/enemies/boats/water_ripple_medium_001.png')
    this.load.image('ripple03', 'assets/images/enemies/boats/water_ripple_medium_002.png')
    this.load.image('ripple04', 'assets/images/enemies/boats/water_ripple_medium_003.png')
    this.load.image('ripple05', 'assets/images/enemies/boats/water_ripple_medium_004.png')
  }

  onProgress(value) {
    this.bar.setPercent(value)
    const per = Math.floor(value * 100)
    this.progText.setText(`${per}%`)
  }

  create() {
    this.scene.start('Title')
  }
}
