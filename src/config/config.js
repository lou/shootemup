export const width = 700
export const height = 1200
export const worldWidth = 800
export const worldHeight = 1400

export const config = {
  waves: [
    {
      enemies: [
      {
        type: 'Plane::Bomber',
        path: [{ x: worldWidth/3, y: -150 }, { x: worldWidth/2 + 300, y: worldHeight+150 }],
        bonus: 'Life',
        escort: [
          {
            type: 'Plane::Carrier',
            position: 'top'
          },
          {
            type: 'Plane::Carrier',
            position: 'right'
          },
          {
            type: 'Plane::Carrier',
            position: 'bottom'
          },
          {
            type: 'Plane::Carrier',
            position: 'left'
          }
        ]
      },
      {
        type: 'Boat::Cruiser',
        path: [{ x: 0-150, y: 800 }, { x: worldWidth+150, y: 1100 }],
        escort: [{
          type: 'Plane::Helicopter',
          rotateAroundTarget: true,
          offsetTarget: 100
        }]
      },
      {
        startAt: 10000,
        type: 'Plane::Carrier',
        path: [{ x: worldWidth/2 - 100, y: -150 }, { x: worldWidth/2 - 100, y: worldHeight+150 }],
      },
      {
        startAt: 10000,
        type: 'Plane::Carrier',
        path: [{ x: worldWidth/2 + 100, y: -150 }, { x: worldWidth/2 + 100, y: worldHeight+150 }],
      },
      {
        type: 'Plane::Bomber',
        startAt: 20000,
        path: [{ x: 500, y: -150 }, { x: 500, y: worldHeight+150 }],
      },
      {
        type: 'Plane::Carrier',
        startAt: 12000,
        path: [{ x: 400, y: -150}, {x: 400, y: worldHeight+150 }],
      },
      {
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [{ x: 0-150, y: 800 }, { x: worldWidth+150, y: 1000}]
      },
      {
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [{ x: 0-150, y: 1000 }, { x: worldWidth+150, y: 1500 }]
      },
      {
        type: 'Boat::Cruiser',
        startAt: 10000,
        path: [{ x: -150, y: 800 }, { x: worldWidth+150, y: 1000 }]
      },
      {
        type: 'Boat::Cruiser',
        startAt: 10000,
        path: [{ x: -150, y: 1000 }, { x: worldWidth+150, y: 1500 }]
      },
      {
        type: 'Boat::Frigate',
        path: [{ x: worldWidth+150, y: 600 }, { x: -150, y: 800 }],
      },
      {
        type: 'Plane::Kamikaze',
        startAt: 0,
        path: [{ x: 500, y: -150 }],
        bonus: 'Shield'
      },
      {
        type: 'Plane::Kamikaze',
        startAt: 5000,
        path: [{ x: 500, y: -150 }],
        bonus: 'Missile'
      },

    ]
  }]
}
