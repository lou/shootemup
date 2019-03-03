import Plane from './Plane'

export default class Bomber extends Plane {
  constructor(scene, options) {
    super(scene, 'bomber', {
      speed: 80,
      armor: 120,
      points: 1,
      ...options
    })
  }
}
