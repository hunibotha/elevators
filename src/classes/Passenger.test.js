import Passenger from "./Passenger"
import Direction from "./Direction"

test("Test Passenger.direction", function () {
  const passenger = new Passenger(undefined, 6, 5)
  
  expect(passenger.direction).toEqual(Direction.DIRECTIONS.DOWN)
  
  passenger.destinationFloor = 7
  expect(passenger.direction).toEqual(Direction.DIRECTIONS.UP)
  
  passenger.currentFloor = 7
  expect(passenger.direction).toEqual(Direction.DIRECTIONS.NO_DIRECTION)
  
  const passenger2 = new Passenger()
  expect(passenger2.direction).toEqual(Direction.DIRECTIONS.NO_DIRECTION)
})
