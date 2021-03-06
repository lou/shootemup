import Plane from './Plane'

export default class Carrier extends Plane {
  constructor(scene, options) {
    super(scene, 'carrier', {
      speed: 80,
      armor: 80,
      points: 1,
      ...options,
    })
  }
}
