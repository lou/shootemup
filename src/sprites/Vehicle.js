import Phaser from 'phaser'

export default class Vehicle extends Phaser.GameObjects.Container {
  constructor(scene, key, options = {}) {
    super(scene, options.x, options.y)
    this.scene = scene
    this.vehicle = scene.add.image(0, 0, key)
    this.add(this.vehicle)
    scene.add.existing(this)
    this.setSize(128, 64)
    this.setInteractive(new Phaser.Geom.Circle(0, 0, 100), Phaser.Geom.Circle.Contains);
    // null, { shape: scene.shapes[key]

    scene.matter.add.gameObject(this)
  }
}
