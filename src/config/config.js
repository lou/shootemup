export const width = 700
export const height = 1300

export const config = {
  waves: [
    {
      enemies: [
        {
          startAt: 1000,
          type: "Plane::Carrier",
          path: [
            { x: width / 2 - 100, y: -150 },
            { x: width / 2 - 100, y: height + 150 }
          ],
          escort: [
            {
              type: "Plane::Carrier",
              position: "top"
            },
            {
              type: "Plane::Carrier",
              position: "right"
            },
            {
              type: "Plane::Carrier",
              position: "left"
            }
          ]
        },
        {
          startAt: 5000,
          type: "Plane::Bomber",
          path: [
            { x: width / 5, y: -150 },
            { x: width / 1.5 + 300, y: height + 150 }
          ]
        },
        {
          startAt: 6500,
          type: "Plane::Bomber",
          path: [{ x: width, y: -150 }, { x: -150, y: height - 150 }]
        },
        {
          startAt: 20000,
          type: "Plane::Bomber",
          path: [
            { x: width / 3, y: -150 },
            { x: width / 2 + 300, y: height + 150 }
          ],
          escort: [
            {
              type: "Plane::Carrier",
              position: "top"
            },
            {
              type: "Plane::Carrier",
              position: "right"
            },
            {
              type: "Plane::Carrier",
              position: "left"
            }
          ]
        },
        {
          startAt: 20000,
          type: "Boat::Cruiser",
          path: [{ x: 0 - 150, y: 50 }, { x: width + 150, y: 1100 }]
        },
        {
          startAt: 25000,
          type: "Boat::Cruiser",
          path: [{ x: width + 150, y: -150 }, { x: -150, y: 800 }],
          escort: [
            {
              type: "Boat::Cruiser",
              position: "top"
            },
            {
              type: "Boat::Cruiser",
              position: "left"
            }
          ]
        },
        {
          startAt: 40000,
          type: "Plane::Carrier",
          path: [
            { x: width / 2 - 100, y: -150 },
            { x: width / 2 - 100, y: height + 150 }
          ]
        },
        {
          startAt: 45000,
          type: "Plane::Carrier",
          path: [
            { x: width / 2 + 100, y: -150 },
            { x: width / 2 + 100, y: height + 150 }
          ]
        },
        {
          type: "Plane::Kamikaze",
          startAt: 45000,
          path: [{ x: 500, y: -150 }],
          bonus: "Gun"
        },
        {
          type: "Plane::Bomber",
          startAt: 45000,
          path: [{ x: 500, y: -150 }, { x: 500, y: height + 150 }]
        },
        {
          type: "Plane::Carrier",
          startAt: 50000,
          path: [{ x: 400, y: -150 }, { x: 400, y: height + 150 }]
        },
        {
          type: "Boat::Cruiser",
          startAt: 55000,
          path: [{ x: -150, y: 300 }, { x: width + 150, y: 600 }],
          escort: [
            {
              type: "Plane::Helicopter",
              rotateAroundTarget: true,
              offsetTarget: 100,
              bonus: "Missile"
            },
            {
              type: "Boat::Cruiser",
              position: "top"
            },
            {
              type: "Boat::Cruiser",
              position: "right"
            },
            {
              type: "Boat::Cruiser",
              position: "left"
            }
          ]
        },
        {
          type: "Boat::Cruiser",
          startAt: 60000,
          path: [{ x: width + 150, y: 500 }, { x: -150, y: 1500 }]
        },
        {
          type: "Boat::Frigate",
          startAt: 60000,
          path: [{ x: 600, y: -150 }, { x: 50, y: height + 150 }]
        },
        {
          type: "Plane::Kamikaze",
          startAt: 70000,
          path: [{ x: 0, y: -150 }]
        },
        {
          type: "Plane::Kamikaze",
          startAt: 70000,
          path: [{ x: 500, y: -150 }],
          bonus: "Shield"
        },
        {
          type: "Plane::Kamikaze",
          startAt: 70000,
          path: [{ x: 700, y: -150 }]
        },
        {
          type: "Plane::Kamikaze",
          startAt: 70000,
          path: [{ x: 900, y: -150 }]
        },
        {
          type: "Boat::Frigate",
          startAt: 75000,
          path: [{ x: 600, y: -150 }, { x: 100, y: height + 150 }],
          escort: [
            {
              type: "Plane::Helicopter",
              rotateAroundTarget: true,
              offsetTarget: 100,
              bonus: "Life"
            },
            {
              type: "Boat::Cruiser",
              position: "top"
            },
            {
              type: "Boat::Cruiser",
              position: "right"
            },
            {
              type: "Boat::Cruiser",
              position: "left"
            },
            {
              type: "Boat::Cruiser",
              position: "bottom"
            }
          ]
        },
        {
          startAt: 80000,
          type: "Plane::Carrier",
          path: [
            { x: width / 2 - 100, y: -150 },
            { x: width / 2 - 100, y: height + 150 }
          ]
        },
        {
          startAt: 80000,
          type: "Plane::Carrier",
          path: [
            { x: width / 2 + 100, y: -150 },
            { x: width / 2 + 100, y: height + 150 }
          ]
        },
        {
          startAt: 80000,
          type: "Plane::Bomber",
          path: [
            { x: width, y: -150 },
            { x: width / 2 - 100, y: height + 150 }
          ],
          bonus: "Gun"
        },
        {
          type: "Plane::Kamikaze",
          startAt: 88000,
          path: [{ x: 700, y: -150 }]
        },
        {
          type: "Plane::Kamikaze",
          startAt: 90000,
          path: [{ x: 900, y: -150 }]
        },
        {
          type: "Plane::Kamikaze",
          startAt: 92000,
          path: [{ x: 700, y: -150 }]
        },
        {
          type: "Plane::Kamikaze",
          startAt: 95000,
          path: [{ x: 900, y: -150 }]
        },
        {
          startAt: 80000,
          type: "Plane::Bomber",
          path: [
            { x: width + 150, y: 650 },
            { x: width / 2 - 100, y: height + 150 }
          ],
          escort: [
            {
              type: "Plane::Carrier",
              position: "top"
            },
            {
              type: "Plane::Carrier",
              position: "right"
            },
            {
              type: "Plane::Carrier",
              position: "bottom"
            },
            {
              type: "Plane::Carrier",
              position: "left"
            }
          ]
        }
      ]
    }
  ]
}
