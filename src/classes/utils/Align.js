export default class Align {
  static scaleToGameWidth(gameObject, percentage, width) {
    gameObject.displayWidth = width * percentage;
    gameObject.scaleY = gameObject.scaleX;
  }
}
