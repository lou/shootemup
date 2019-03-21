import Phaser from 'phaser'
import { width, height } from '../../config/config'

export default class UIButton extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene)
    this.scene = config.scene // the scene this button Game Object will belong to
    this.targetScene = config.targetScene // the scene we will transition to when the player clicks the button
    this.y = config.y // the y position of our container
    this.text = config.text // the text that will be displayed on our button
    this.onClick = config.onClick
    this.createButton()
    this.scene.add.existing(this) // add this container to the Phaser Scene
  }

  createButton() {
    this.gameText = this.scene.add.text(0, 0, this.text, {
      fontFamily: 'Arial',
      fontSize: '21px',
      fill: '#000',
      align: 'center',
      backgroundColor: '#fff',
      padding: { top: 10, left: 20 },
    })
    this.gameText
      .setInteractive()
      .setX(Math.min(width, innerWidth) / 2 - this.gameText.width / 2)
      .setY(this.y)
      .setFixedSize(300, 20)

    this.gameText.on('pointerdown', () => {
      if (this.onClick) {
        this.onClick()
      } else {
        this.scene.scene.start(this.targetScene)
      }
    })

    this.gameText.on('pointerover', () => {
      this.gameText.setBackgroundColor('#65afe3')
      this.gameText.setFill('#ffffff')
    })

    this.gameText.on('pointerout', () => {
      this.gameText.setBackgroundColor('#ffffff')
      this.gameText.setFill('#000000')
    })
  }
}
