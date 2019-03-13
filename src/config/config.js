export const width = 700
export const height = 1200
export const worldWidth = 800
export const worldHeight = 1400

export const config = {
  waves: [
    {
      enemies: [
      {
        id: 0,
        type: 'Plane::Bomber',
        startAt: 0,
        path: [{ x: worldWidth/3, y: -150 }, { x: worldWidth/2 + 300, y: worldHeight+150 }],
        bonus: 'Life'
      },
      {
        id: 1,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          targetGroup: 'planes',
          position: 'left'
        }
      },
      {
        id: 2,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          targetGroup: 'planes',
          position: 'right'
        }
      },
      {
        id: 3,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          targetGroup: 'planes',
          offset: 100,
          position: 'top'
        }
      },
      {
        id: 4,
        startAt: 8000,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          targetGroup: 'planes',
          position: 'bottom'
        }
      },
      {
        id: 5,
        startAt: 10000,
        type: 'Plane::Carrier',
        path: [{ x: worldWidth/2 - 100, y: -150 }, { x: worldWidth/2 - 100, y: worldHeight+150 }],
      },
      {
        id: 6,
        startAt: 10000,
        type: 'Plane::Carrier',
        path: [{ x: worldWidth/2 + 100, y: -150 }, { x: worldWidth/2 + 100, y: worldHeight+150 }],
      },
      {
        id: 7,
        type: 'Plane::Bomber',
        startAt: 20000,
        path: [{ x: 500, y: -150 }, { x: 500, y: worldHeight+150 }],
      },
      {
        id: 8,
        type: 'Plane::Carrier',
        startAt: 12000,
        path: [{ x: 400, y: -150}, {x: 400, y: worldHeight+150 }],
      },
      {
        id: 9,
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [{ x: 0-150, y: 800 }, { x: worldWidth+150, y: 1000}]
      },
      {
        id: 10,
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [{ x: 0-150, y: 1000 }, { x: worldWidth+150, y: 1500 }]
      },
      {
        id: 11,
        type: 'Boat::Cruiser',
        startAt: 10000,
        path: [{ x: -150, y: 800 }, { x: worldWidth+150, y: 1000 }]
      },
      {
        id: 12,
        type: 'Boat::Cruiser',
        startAt: 10000,
        path: [{ x: -150, y: 1000 }, { x: worldWidth+150, y: 1500 }]
      },
      {
        id: 13,
        type: 'Boat::Frigate',
        path: [{ x: worldWidth+150, y: 600 }, { x: -150, y: 800 }],
      },
      {
        id: 14,
        type: 'Plane::Helicopter',
        startAt: 10000,
        escort: {
          targetId: 12,
          targetGroup: 'boats',
          position: 'bottom',
          offset: -40
        }
      },
      {
        id: 15,
        type: 'Plane::Kamikaze',
        startAt: 0,
        path: [{ x: 500, y: -150 }],
        bonus: 'Shield'
      },
      {
        id: 16,
        type: 'Plane::Kamikaze',
        startAt: 5000,
        path: [{ x: 500, y: -150 }],
        bonus: 'Missile'
      },
      {
        id: 17,
        startAt: 5000,
        type: 'Boat::Cruiser',
        path: [{ x: 0-150, y: 1000 }, { x: worldWidth+150, y: 1500 }]
      },
      {
        id: 18,
        type: 'Plane::Helicopter',
        startAt: 10000,
        escort: {
          targetId: 17,
          targetGroup: 'boats',
          rotateAround: true,
          offset: 80
        }
      },
    ]
  }]
}
