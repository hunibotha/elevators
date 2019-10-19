import Direction from "./Direction"

test("Test Direction.Calculate", function () {
  const testCases = [
    {
      startFloor: 1,
      destinationFloor: 2,
      expected: Direction.DIRECTIONS.UP
    },
    {
      startFloor: 1,
      destinationFloor: 0,
      expected: Direction.DIRECTIONS.DOWN
    },
    {
      startFloor: 1,
      destinationFloor: 1,
      expected: Direction.DIRECTIONS.NO_DIRECTION
    }
  ]
  
  testCases.forEach(({startFloor, destinationFloor, expected}) => {
    const output = Direction.Calculate(startFloor, destinationFloor)
    expect(output).toEqual(expected)
  })
})
