export const width = 600
export const height = 800

export const config = {
  waves: [{
    enemies: [
    {
      type: 'Plane::Bomber',
      x: 360,
      y: -300,
    },
    {
      type: 'Plane::Carrier',
      x: 290,
      y: 190,
      bonus: 'Gun'
    },
    {
      type: 'Plane::Carrier',
      x: 100,
      y: -100,
    },
    {
      type: 'Boat::Cruiser',
      x: 150,
      y: -160,
    },
    {
      type: 'Boat::Cruiser',
      x: 250,
      y: -190,
    },
    {
      type: 'Boat::Cruiser',
      x: 300,
      y: -200,
    },
    {
      type: 'Plane::Carrier',
      x: 300,
      y: -300,
    },
    {
      type: 'Boat::Frigate',
      x: 500,
      y: -900,
    },
    {
      type: 'Boat::Frigate',
      x: 300,
      y: -600,
    },
    {
      type: 'Plane::Carrier',
      x: 100,
      y: -100,
    },
    {
      type: 'Plane::Helicopter',
      x: 300,
      y: -500,
    },
    {
      type: 'Plane::Carrier',
      x: 500,
      y: -780,
    },
    {
      type: 'Plane::Kamikaze',
      x: 600,
      y: -600,
      bonus: 'Shield'
    },
    {
      type: 'Boat::Cruiser',
      y: 250,
      x: -70
    },
    {
      type: 'Plane::Helicopter',
      x: 500,
      y: -100,
      bonus: 'Life'
    },
    {
      type: 'Boat::Frigate',
      y: -50,
      x: 400
    }
  ]
  }]
}
