export const width = 700
export const height = 1200

export const config = {
  waves: [
    {
      enemies: [
      {
        type: 'Plane::Bomber',
        path: [300, -150, 300, height*1.5+150],
        bonus: 'Gun'
      },
      {
        type: 'Plane::Bomber',
        startAt: 20000,
        path: [500, -150, 500, height*1.5+150],
      },
      {
        type: 'Plane::Carrier',
        startAt: 7000,
        path: [600, -150, 600, height*1.5+150],
      },
      {
        type: 'Plane::Carrier',
        startAt: 5000,
        path: [500, -150, 500, height*1.5+150],
      },
      {
        type: 'Plane::Carrier',
        startAt: 7000,
        path: [400, -150, 400, height*1.5+150],
      },
      {
        type: 'Boat::Cruiser',
        startAt: 2000,
        path: [0-150, 800, width*1.5+150, 1000]
      },
      {
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [0-150, 1000, width*1.5+150, 1500]
      },
      {
        type: 'Boat::Cruiser',
        startAt: 10000,
        path: [-150, 800, width*1.5+150, 1000]
      },
      {
        type: 'Boat::Cruiser',
        startAt: 10000,
        path: [-150, 1000, width*1.5+150, 1500]
      },
      {
        type: 'Boat::Frigate',
        startAt: 0,
        path: [800, -150, 900, height*1.5+150],
      },
      {
        type: 'Boat::Frigate',
        startAt: 0,
        path: [600, -150, 700, height*1.5+150],
      },
      {
        type: 'Boat::Frigate',
        startAt: 0,
        path: [550, -150, 650, height*1.5+150],
      },
      {
        type: 'Boat::Frigate',
        path: [width*1.5+150, 600, -150, 800],
      },
      {
        type: 'Plane::Helicopter',
        startAt: 8000,
        path: [550, -150, 650, height*1.5+150],
      },
      {
        type: 'Plane::Helicopter',
        startAt: 0,
        path: [width*1.5+150, 600, -150, 800],
      },
      {
        type: 'Plane::Helicopter',
        startAt: 8000,
        path: [450, -150, 450, height*1.5+150],
        bonus: 'Life'
      },
      {
        type: 'Plane::Helicopter',
        startAt: 0,
        path: [450, -150, 450, height*1.5+150]
      },
      {
        type: 'Plane::Kamikaze',
        startAt: 0,
        path: [500, -150],
        bonus: 'Shield'
      },
      {
        type: 'Plane::Kamikaze',
        startAt: 5000,
        path: [500, -150],
        bonus: 'Missile'
      }
    ]
  }]
}
