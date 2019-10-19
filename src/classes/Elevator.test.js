import Elevator from "./Elevator"
import Passenger from "./Passenger"
import Direction from "./Direction"

const passenger1 = new Passenger()
const passenger2 = new Passenger()
const passenger3 = new Passenger()
const passenger4 = new Passenger()

test("Test Elevator.direction", function () {
  const elevator = new Elevator(undefined, 3, 4)
  
  expect(elevator.direction).toEqual(Direction.DIRECTIONS.UP)
  
  elevator.destinationFloor = 2
  expect(elevator.direction).toEqual(Direction.DIRECTIONS.DOWN)
  
  elevator.currentFloor = 2
  expect(elevator.direction).toEqual(Direction.DIRECTIONS.NO_DIRECTION)
  
  const elevator2 = new Elevator()
  expect(elevator2.direction).toEqual(Direction.DIRECTIONS.NO_DIRECTION)
})

test("Test Elevator.AssignPassenger", function () {
  const elevator = new Elevator(
    undefined,
    undefined,
    undefined,
    [passenger1, passenger2, passenger3]
  )
  
  elevator.AssignPassenger(passenger4)
  expect(elevator.assignedPassengers).toEqual([passenger1, passenger2, passenger3, passenger4])
})

test("Test Elevator.AssignPassengers", function () {
  const elevator = new Elevator(
    undefined,
    undefined,
    undefined,
    [passenger1, passenger2]
  )
  
  elevator.AssignPassengers([passenger3, passenger4])
  expect(elevator.assignedPassengers).toEqual([passenger1, passenger2, passenger3, passenger4])
})

test("Test Elevator.UnAssignPassenger", function () {
  const elevator = new Elevator(
    undefined,
    undefined,
    undefined,
    [passenger1, passenger2, passenger3, passenger4]
  )
  
  elevator.UnAssignPassenger(passenger3)
  expect(elevator.assignedPassengers).toEqual([passenger1, passenger2, passenger4])
  
  elevator.UnAssignPassenger(passenger3)
  expect(elevator.assignedPassengers).toEqual([passenger1, passenger2, passenger4])
})

test(
  "Test Elevator.GetTimeToPassenger when elevator has to finish the current delivery before getting back to the passenger",
  function () {
    /**
     * Test Elevator.GetTimeToPassenger when elevator has already left the the passenger's floor and has to finish the
     * current delivery before getting back to the passenger.
     * - passenger is on floor 4, and wants to get to the 5th floor
     * - elevator is on the 6th floor and is moving to the 10th floor, having to deliver 3 more persons at the 7th, 8th
     * and 10th floor
     * - expected result:
     *  - the elevator should first finish the current trip, then get to the passenger. The steps the elevator makes are:
     *    1. goes from floor 6 to floor 7: 1/elevator.speed secs pass
     *    2. stops at floor 7: elevator.averageStopTime secs pass
     *    3. goes to floor 8: 1/elevator.speed secs pass
     *    4. stops at floor 8: elevator.averageStopTime secs pass
     *    5. goes to floor 10: 2/elevator.speed secs pass
     *    6. stops at floor 10: elevator.averageStopTime secs pass
     *    7. goes to floor 4: 6/elevator.speed secs pass
     *  - total amount of time the user has to wait for the elevator is: 1/elevator.speed + elevator.averageStopTime +
     *   1/elevator.speed + elevator.averageStopTime + 2/elevator.speed + elevator.averageStopTime + 5/elevator.speed secs
     */
    const passenger = new Passenger(undefined, 4, 5)
    const elevator = new Elevator(
      undefined,
      6,
      10,
      [
        new Passenger(undefined, 1, 7),
        new Passenger(undefined, 2, 8),
        new Passenger(undefined, 1, 10)
      ]
    )
    
    const timeToWait = elevator.GetTimeToPassenger(passenger)
    const expectedTimeToWait = 1 / elevator.speed + elevator.averageStopTime + 1 / elevator.speed +
      elevator.averageStopTime + 2 / elevator.speed + elevator.averageStopTime + 6 / elevator.speed
    
    expect(timeToWait).toEqual(expectedTimeToWait)
  }
)

test("Test Elevator.GetNumberOfStopsBetweenFloors", function () {
  
  const elevator = new Elevator(
    undefined,
    6,
    12,
    [
      new Passenger(undefined, 1, 7),
      new Passenger(undefined, 2, 8),
      new Passenger(undefined, 1, 10)
    ]
  )
  
  expect(elevator.GetNumberOfStopsBetweenFloors(7, 10)).toEqual(3)
  expect(elevator.GetNumberOfStopsBetweenFloors(8, 10)).toEqual(2)
  expect(elevator.GetNumberOfStopsBetweenFloors(9, 10)).toEqual(1)
  expect(elevator.GetNumberOfStopsBetweenFloors(5, 6)).toEqual(0)
  expect(elevator.GetNumberOfStopsBetweenFloors(7, 7)).toEqual(1)
})

test("Test Elevator.CanPickUpPassenger", function () {
  
  const passenger = new Passenger(undefined, 3, 4)
  
  const elevatorStandBy = new Elevator(undefined, 4, 4)
  expect(elevatorStandBy.CanPickUpPassenger(passenger)).toEqual(true)
  
  const elevatorMovingInTheDirectionOfThePassengerUp = new Elevator(undefined, 1, 2)
  expect(
    elevatorMovingInTheDirectionOfThePassengerUp.CanPickUpPassenger(passenger)
  ).toEqual(true)
  
  const elevatorMovingInTheDirectionOfThePassengerUpper = new Elevator(undefined, 1, 4)
  expect(
    elevatorMovingInTheDirectionOfThePassengerUpper.CanPickUpPassenger(passenger)
  ).toEqual(true)
  
  const elevatorMovingInTheDirectionOfThePassengerDown = new Elevator(undefined, 6, 4)
  expect(
    elevatorMovingInTheDirectionOfThePassengerDown.CanPickUpPassenger(passenger)
  ).toEqual(true)
  
  const elevatorMovingInTheDirectionOfThePassengerDowner = new Elevator(undefined, 6, 2)
  expect(
    elevatorMovingInTheDirectionOfThePassengerDowner.CanPickUpPassenger(passenger)
  ).toEqual(false)
})

test("Test Elevator.IsMovingInTheDirectionOfThePassenger when elevator moving up", function () {
  
  const elevator = new Elevator(
    undefined,
    4,
    10
  )
  
  const passengerInOppositeDirection = new Passenger(undefined, 3)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerInOppositeDirection)).toEqual(false)
  
  const passengerInSameDirection = new Passenger(undefined, 5)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerInSameDirection)).toEqual(true)
  
  const passengerInSameDirection2 = new Passenger(undefined, 4)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerInSameDirection2)).toEqual(true)
})

test("Test Elevator.IsMovingInTheDirectionOfThePassenger when elevator moving down", function () {
  
  const elevator = new Elevator(
    undefined,
    10,
    4
  )
  
  const passengerInOppositeDirection = new Passenger(undefined, 12)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerInOppositeDirection)).toEqual(false)
  
  const passengerInSameDirection = new Passenger(undefined, 5)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerInSameDirection)).toEqual(true)
  
  const passengerInSameDirection2 = new Passenger(undefined, 10)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerInSameDirection2)).toEqual(true)
})

test("Test Elevator.IsMovingInTheDirectionOfThePassenger when elevator is standing by", function () {
  
  const elevator = new Elevator(
    undefined,
    4,
    4
  )
  
  const passengerOnAHigherFloor = new Passenger(undefined, 12)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerOnAHigherFloor)).toEqual(false)
  
  const passengerOnTheSameFloor = new Passenger(undefined, 4)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerOnTheSameFloor)).toEqual(false)
  
  const passengerOnALowerFloor = new Passenger(undefined, 3)
  expect(elevator.IsMovingInTheDirectionOfThePassenger(passengerOnALowerFloor)).toEqual(false)
})
