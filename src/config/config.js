export const width = 800
export const height = 1000

export const config = {
  waves: [
    {
      enemies: [
      {
        type: 'Plane::Bomber',
        startAt: 0,
        path: [500, 0, 500, 500, 550, 1000, width*1.5, 300],
        bonus: 'Gun'
      },
      {
        type: 'Plane::Carrier',
        startAt: 5000,
        path: [0, 0, 300, 300, 600, 600, width*1.5, height*1.5],
      },
      {
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [0, 400, 300, 300, 600, 600, width*1.5, height*1.5],
      },
      {
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [0, 500, 300, 300, 600, 600, width*1.5, height*1.5],
      },
      {
        type: 'Boat::Cruiser',
        startAt: 0,
        path: [0, 600, 300, 300, 600, 600, width*1.5, height*1.5],
      },
      {
        type: 'Boat::Frigate',
        startAt: 0,
        path: [300, 0, 300, 600, 800, 800, width*1.5, height*1.5],
      },
      {
        type: 'Boat::Frigate',
        startAt: 0,
        path: [400, 0, 300, 600, 800, 900, width*1.5, height*1.5],
      },
      // {
      //   type: 'Boat::Cruiser',
      //   start: {
      //     time: 0,
      //     from: 'left',
      //     distance: 200
      //   }
      // },      {
      //   type: 'Boat::Frigate',
      //   start: {
      //     time: 0,
      //     from: 'top',
      //     distance: 500
      //   }
      // },
      // {
      //   type: 'Boat::Frigate',
      //   start: {
      //     time: 4000,
      //     from: 'top',
      //     distance: 850
      //   }
      // },
      // {
      //   type: 'Plane::Helicopter',
      //   start: {
      //     time: 500,
      //     from: 'top',
      //     distance: 750
      //   }
      // },
      // {
      //   type: 'Plane::Helicopter',
      //   start: {
      //     time: 10000,
      //     from: 'top',
      //     distance: 550
      //   },
      //   bonus: 'Life'
      // },
      // {
      //   type: 'Plane::Helicopter',
      //   start: {
      //     time: 9000,
      //     from: 'top',
      //     distance: 450
      //   }
      // },
      // {
      //   type: 'Plane::Kamikaze',
      //   start: {
      //     time: 5000,
      //     from: 'top',
      //     distance: 700
      //   },
      //   bonus: 'Shield'
      // },
      // {
      //   type: 'Plane::Kamikaze',
      //   start: {
      //     time: 3000,
      //     from: 'top',
      //     distance: 100
      //   }
      // },

    ]
  }]
}
