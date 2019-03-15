import Plane from './Plane'

export default class Bomber extends Plane {
  constructor(scene, options) {
    super(scene, 'bomber', {
      speed: 60,
      armor: 180,
      points: 1,
      ...options
    })
  }
}
