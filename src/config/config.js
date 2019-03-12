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
        path: [{ x: worldWidth/3, y: 150 }, { x: worldWidth/2 + 300, y: worldHeight+150 }],
        bonus: 'life'
      },
      {
        id: 1,
        startAt: 0,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          offsetX: 150
        }
      },
      {
        id: 2,
        startAt: 0,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          offsetX: -150
        }
      },
      {
        id: 3,
        startAt: 0,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          offsetY: 150
        }
      },
      {
        id: 4,
        startAt: 0,
        type: 'Plane::Carrier',
        escort: {
          targetId: 0,
          offsetY: -150
        }
      },
      // {
      //   startAt: 10000,
      //   type: 'Plane::Carrier',
      //   path: [worldWidth/2 - 100, -150, worldWidth/2 - 100, worldHeight+150],
      // },
      // {
      //   startAt: 10000,
      //   type: 'Plane::Carrier',
      //   path: [worldWidth/2 + 100, -150, worldWidth/2 + 100, worldHeight+150],
      // },
      // {
      //   type: 'Plane::Bomber',
      //   startAt: 20000,
      //   path: [500, -150, 500, worldHeight+150],
      // },
      // {
      //   type: 'Plane::Carrier',
      //   startAt: 7000,
      //   path: [400, -150, 400, worldHeight+150],
      // },
      // {
      //   type: 'Boat::Cruiser',
      //   startAt: 2000,
      //   path: [0-150, 800, worldWidth+150, 1000]
      // },
      // {
      //   type: 'Boat::Cruiser',
      //   startAt: 0,
      //   path: [0-150, 1000, worldWidth+150, 1500]
      // },
      // {
      //   type: 'Boat::Cruiser',
      //   startAt: 10000,
      //   path: [-150, 800, worldWidth+150, 1000]
      // },
      // {
      //   type: 'Boat::Cruiser',
      //   startAt: 10000,
      //   path: [-150, 1000, worldWidth+150, 1500]
      // },
      // {
      //   type: 'Boat::Frigate',
      //   startAt: 0,
      //   path: [800, -150, 900, worldHeight+150],
      // },
      // {
      //   type: 'Boat::Frigate',
      //   startAt: 0,
      //   path: [600, -150, 700, worldHeight+150],
      // },
      // {
      //   type: 'Boat::Frigate',
      //   startAt: 0,
      //   path: [550, -150, 650, worldHeight+150],
      // },
      // {
      //   type: 'Boat::Frigate',
      //   path: [worldWidth+150, 600, -150, 800],
      // },
      // {
      //   type: 'Plane::Helicopter',
      //   startAt: 8000,
      //   path: [550, -150, 650, worldHeight+150],
      // },
      // {
      //   type: 'Plane::Helicopter',
      //   startAt: 0,
      //   path: [worldWidth+150, 600, -150, 800],
      // },
      // {
      //   type: 'Plane::Helicopter',
      //   startAt: 8000,
      //   path: [450, -150, 450, worldHeight+150],
      //   bonus: 'Life'
      // },
      // {
      //   type: 'Plane::Helicopter',
      //   startAt: 0,
      //   path: [450, -150, 450, worldHeight+150]
      // },
      // {
      //   type: 'Plane::Kamikaze',
      //   startAt: 0,
      //   path: [500, -150],
      //   bonus: 'Shield'
      // },
      // {
      //   type: 'Plane::Kamikaze',
      //   startAt: 5000,
      //   path: [500, -150],
      //   bonus: 'Missile'
      // }
    ]
  }]
}
