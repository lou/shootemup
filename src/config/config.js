export const width = 800
export const height = 1000

export const config = {
  waves: [
    {
      enemies: [
      {
        type: 'Plane::Bomber',
        start: {
          time: 0,
          from: 'top',
          distance: 300
        },
        bonus: 'Gun'
      },
      {
        type: 'Plane::Bomber',
        start: {
          time: 0,
          from: 'top',
          distance: 700
        },
        bonus: 'Gun'
      },
      {
        type: 'Plane::Carrier',
        start: {
          time: 5000,
          from: 'top',
          distance: 300
        }
      },
      {
        type: 'Plane::Carrier',
        start: {
          time: 5500,
          from: 'top',
          distance: 350
        }
      },
      {
        type: 'Plane::Carrier',
        start: {
          time: 5500,
          from: 'top',
          distance: 250
        }
      },
      {
        type: 'Boat::Cruiser',
        start: {
          time: 0,
          from: 'left',
          distance: 100
        }
      },
      {
        type: 'Boat::Cruiser',
        start: {
          time: 0,
          from: 'left',
          distance: 200
        }
      },      {
        type: 'Boat::Frigate',
        start: {
          time: 0,
          from: 'top',
          distance: 500
        }
      },
      {
        type: 'Boat::Frigate',
        start: {
          time: 4000,
          from: 'top',
          distance: 850
        }
      },
      {
        type: 'Plane::Helicopter',
        start: {
          time: 500,
          from: 'top',
          distance: 750
        }
      },
      {
        type: 'Plane::Helicopter',
        start: {
          time: 10000,
          from: 'top',
          distance: 550
        },
        bonus: 'Life'
      },
      {
        type: 'Plane::Helicopter',
        start: {
          time: 9000,
          from: 'top',
          distance: 450
        }
      },
      {
        type: 'Plane::Kamikaze',
        start: {
          time: 5000,
          from: 'top',
          distance: 700
        },
        bonus: 'Shield'
      },
      {
        type: 'Plane::Kamikaze',
        start: {
          time: 3000,
          from: 'top',
          distance: 100
        }
      },

    ]
  }]
}
