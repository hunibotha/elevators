import Elevator from "./Elevator"
import Passenger from "./Passenger"
import Direction from "./Direction"

const passenger1 = new Passenger()
const passenger2 = new Passenger()
const passenger3 = new Passenger()
const passenger4 = new Passenger()

test("Test Elevator.GetTotalDeliveryTimeForPassenger when elevator has to finish delivery before pick-up", function () {
  /**
   * Test Elevator.GetTotalDeliveryTimeOfPassenger when elevator has to finish delivery before pick-up.
   * - passenger is on floor 4, and wants to get to the 8th floor
   * - elevator is on the 6th floor and is moving to the 10th floor, having to deliver 4 more persons to the 7th,
   * 8th(2 persons) and 10th floor.
   * - expected result:
   *  - the elevator should first finish the current trip, then get to the passenger. The steps the elevator makes are:
   *    1. goes from floor 6 to floor 7: 1/elevator.speed secs pass
   *    2. stops at floor 7: elevator.averageStopTime secs pass
   *    3. goes to floor 8: 1/elevator.speed secs pass
   *    4. stops at floor 8(2 passengers are put down but it counts as 1 stop): elevator.averageStopTime secs pass
   *    5. goes to floor 10: 2/elevator.speed secs pass
   *    6. stops at floor 10: elevator.averageStopTime secs pass
   *    7. goes to floor 4: 6/elevator.speed secs pass
   *    8. stops at floor 4: elevator.averageStopTime secs pass
   *    9. goes to floor 8: 4/elevator.speed secs pass
   *  - total amount of time the passenger has to wait for the elevator is: 1/elevator.speed + elevator.averageStopTime +
   *   1/elevator.speed + elevator.averageStopTime + 2/elevator.speed + elevator.averageStopTime +
   *   6/elevator.speed + elevator.averageStopTime + 4/elevator.speed secs
   */
  const passenger = new Passenger(undefined, 4, 8)
  const elevator = new Elevator(
    undefined,
    6,
    10,
    [
      new Passenger(undefined, 1, 7),
      new Passenger(undefined, 2, 8),
      new Passenger(undefined, 0, 8),
      new Passenger(undefined, 1, 10)
    ]
  )
  
  const totalDeliveryTime = elevator.GetTotalDeliveryTimeForPassenger(passenger)
  const expectedTotalDeliveryTime = 1 / elevator.speed + elevator.averageStopTime + 1 / elevator.speed +
    elevator.averageStopTime + 2 / elevator.speed + elevator.averageStopTime + 6 / elevator.speed +
    elevator.averageStopTime + 4 / elevator.speed
  
  expect(totalDeliveryTime).toEqual(expectedTotalDeliveryTime)
})

test("Test Elevator.GetTotalDeliveryTimeForPassenger when elevator can pick up passenger during delivery", function () {
  /**
   * Test Elevator.GetTotalDeliveryTimeOfPassenger when elevator can pick up passenger during delivery.
   * - passenger is on the 4th floor and wants to get to the 11th floor
   * - elevator is on the 0th floor and is moving to the 10th floor, having to deliver 7 more persons:
   *  - 1 person to the 1st floor
   *  - 2 persons to the 3rd floor
   *  - 1 person to the 4th floor
   *  - 1 person to the 6th floor
   *  - 2 persons to the 10th floor
   * - expected result:
   *  - the steps the elevator makes are:
   *    1. goes from floor 0 to floor 1: 1/elevator.speed secs pass
   *    2. stops at floor 1: elevator.averageStopTime secs pass
   *    3. goes to floor 3: 2/elevator.speed secs pass
   *    4. stops at floor 3: elevator.averageStopTime secs pass
   *    5. goes to floor 4: 1/elevator.speed secs pass
   *    6. stops at floor 4: elevator.averageStopTime secs pass
   *    7. goes to floor 6: 2/elevator.speed secs pass
   *    8. stops at floor 6: elevator.averageStopTime secs pass
   *    9. goes to floor 10: 4/elevator.speed secs pass
   *    10.stops at floor 10: elevator.averageStopTime secs pass
   *    11.goes to floor 11: 1/elevator.speed secs pass
   *  - total amount of time the passenger has to wait for the elevator is: 1 / elevator.speed +
   *  elevator.averageStopTime + 2 / elevator.speed + elevator.averageStopTime + 1 / elevator.speed +
   *  elevator.averageStopTime + 2/elevator.speed + elevator.averageStopTime + 4/elevator.speed +
   *  elevator.averageStopTime + 1/elevator.speed
   */
  const passenger = new Passenger(undefined, 4, 11)
  const elevator = new Elevator(
    undefined,
    0,
    10,
    [
      new Passenger(undefined, 0, 1),
      new Passenger(undefined, 0, 3),
      new Passenger(undefined, 0, 3),
      new Passenger(undefined, 0, 4),
      new Passenger(undefined, 0, 6),
      new Passenger(undefined, 0, 10),
      new Passenger(undefined, 0, 10)
    ]
  )
  
  const deliveryTime = elevator.GetTotalDeliveryTimeForPassenger(passenger)
  const expectedDeliveryTime = 1 / elevator.speed + elevator.averageStopTime + 2 / elevator.speed +
    elevator.averageStopTime + 1 / elevator.speed + elevator.averageStopTime + 2/elevator.speed +
    elevator.averageStopTime + 4/elevator.speed + elevator.averageStopTime + 1/elevator.speed
  
  expect(deliveryTime).toEqual(expectedDeliveryTime)
})

test("Test Elevator.GetDeliveryTimeForPassenger when elevator can pick up passenger during delivery", function () {
  /**
   * Test Elevator.GetDeliveryTimeOfPassenger when elevator can pick up passenger during delivery.
   * - passenger is on the 4th floor and wants to get to the 11th floor
   * - elevator has stopped for the passenger on the 4th floor and is moving to the 11th floor, having to deliver 3 more
   * passengers:
   *  - 1 person to the 6th floor
   *  - 2 persons to the 10th floor
   *  - 1 person to the 11th floor
   * - expected result:
   *  - the steps the elevator makes are:
   *    1. goes from floor 4 to floor 6: 2/elevator.speed secs pass
   *    2. stops at floor 6: elevator.averageStopTime secs pass
   *    3. goes to floor 10: 4/elevator.speed secs pass
   *    4. stops at floor 10: elevator.averageStopTime secs pass
   *    5. goes to floor 11: 1/elevator.speed secs pass
   *    *Stopping at floor 11 shouldn't be counted because the elevator has already arrived at the passenger.
   *  - total gets delivered by the elevator in: 2/elevator.speed + elevator.averageStopTime +
   *   4/elevator.speed + elevator.averageStopTime + 1/elevator.speed secs
   */
  const passenger = new Passenger(undefined, 4, 11)
  const elevator = new Elevator(
    undefined,
    4,
    11,
    [
      new Passenger(undefined, 0, 6),
      new Passenger(undefined, 1, 10),
      new Passenger(undefined, 2, 10),
      new Passenger(undefined, 3, 11)
    ]
  )
  
  const deliveryTime = elevator.GetDeliveryTimeForPassenger(passenger)
  const expectedDeliveryTime = 2 / elevator.speed + elevator.averageStopTime + 4 / elevator.speed +
    elevator.averageStopTime + 1 / elevator.speed
  
  expect(deliveryTime).toEqual(expectedDeliveryTime)
})

test(
  "Test Elevator.GetTimeToPassenger when elevator has to finish the current delivery before getting back to the passenger",
  function () {
    /**
     * Test Elevator.GetTimeToPassenger when elevator has already left the the passenger's floor and has to finish the
     * current delivery before getting back to the passenger.
     * - passenger is on floor 4, and wants to get to the 5th floor
     * - elevator is on the 6th floor and is moving to the 10th floor, having to deliver 4 more persons to the 7th,
     * 8th(2 persons) and 10th floor.
     * - expected result:
     *  - the elevator should first finish the current trip, then get to the passenger. The steps the elevator makes are:
     *    1. goes from floor 6 to floor 7: 1/elevator.speed secs pass
     *    2. stops at floor 7: elevator.averageStopTime secs pass
     *    3. goes to floor 8: 1/elevator.speed secs pass
     *    4. stops at floor 8(2 passengers are put down but it counts as 1 stop): elevator.averageStopTime secs pass
     *    5. goes to floor 10: 2/elevator.speed secs pass
     *    6. stops at floor 10: elevator.averageStopTime secs pass
     *    7. goes to floor 4: 6/elevator.speed secs pass
     *  - total amount of time the passenger has to wait for the elevator is: 1/elevator.speed + elevator.averageStopTime +
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
        new Passenger(undefined, 0, 8),
        new Passenger(undefined, 1, 10)
      ]
    )
    
    const timeToWait = elevator.GetTimeToPassenger(passenger)
    const expectedTimeToWait = 1 / elevator.speed + elevator.averageStopTime + 1 / elevator.speed +
      elevator.averageStopTime + 2 / elevator.speed + elevator.averageStopTime + 6 / elevator.speed
    
    expect(timeToWait).toEqual(expectedTimeToWait)
  }
)

test("Test Elevator.GetTimeToPassenger when elevator can pick up passenger after delivery", function () {
  /**
   * Test Elevator.GetTimeToPassenger when elevator can pick up passenger but the delivery ends before getting to the passenger.
   * - passenger is on the 4th floor and wants to get to the 5th floor
   * - elevator is on the 1st floor and is moving to the 3rd floor, having to deliver 1 more person on the 3rd floor.
   * - expected result:
   *  - the steps the elevator makes are:
   *    1. goes from floor 1 to floor 3: 2/elevator.speed secs pass
   *    2. stops at floor 3: elevator.averageStopTime secs pass
   *    3. goes to floor 4: 1/elevator.speed secs pass
   *  - total amount of time the passenger has to wait for the elevator is: 2/elevator.speed + elevator.averageStopTime +
   *   1/elevator.speed secs
   */
  const passenger = new Passenger(undefined, 4, 5)
  const elevator = new Elevator(
    undefined,
    1,
    3,
    [new Passenger(undefined, 1, 3)]
  )
  
  const timeToWait = elevator.GetTimeToPassenger(passenger)
  const expectedTimeToWait = 2 / elevator.speed + elevator.averageStopTime + 1 / elevator.speed
  
  expect(timeToWait).toEqual(expectedTimeToWait)
})

test("Test Elevator.GetTimeToPassenger when elevator can pick up passenger during delivery", function () {
  /**
   * Test Elevator.GetTimeToPassenger when elevator can pick up passenger during the delivery.
   * - passenger is on the 4th floor and wants to get to the 5th floor
   * - elevator is on the 0th floor and is moving to the 10th floor, having to deliver 7 more persons:
   *  - 1 person to the 1st floor
   *  - 2 persons to the 3rd floor
   *  - 1 person to the 4th floor
   *  - 1 person to the 6th floor
   *  - 2 persons to the 10th floor
   * - expected result:
   *  - the steps the elevator makes are:
   *    1. goes from floor 0 to floor 1: 1/elevator.speed secs pass
   *    2. stops at floor 1: elevator.averageStopTime secs pass
   *    3. goes to floor 3: 2/elevator.speed secs pass
   *    4. stops at floor 3: elevator.averageStopTime secs pass
   *    5. goes to floor 4: 1/elevator.speed secs pass
   *    *Stopping at floor 4 shouldn't be counted because the elevator has already arrived at the passenger.
   *  - total amount of time the passenger has to wait for the elevator is: 1/elevator.speed + elevator.averageStopTime +
   *   2/elevator.speed + elevator.averageStopTime + 1/elevator.speed secs
   */
  const passenger = new Passenger(undefined, 4, 5)
  const elevator = new Elevator(
    undefined,
    0,
    10,
    [
      new Passenger(undefined, 0, 1),
      new Passenger(undefined, 0, 3),
      new Passenger(undefined, 0, 3),
      new Passenger(undefined, 0, 4),
      new Passenger(undefined, 0, 6),
      new Passenger(undefined, 0, 10),
      new Passenger(undefined, 0, 10)
    ]
  )
  
  const timeToWait = elevator.GetTimeToPassenger(passenger)
  const expectedTimeToWait = 1 / elevator.speed + elevator.averageStopTime + 2 / elevator.speed +
    elevator.averageStopTime + 1 / elevator.speed
  
  expect(timeToWait).toEqual(expectedTimeToWait)
})

test("Test Elevator.GetTimeToPassenger when elevator is in stand-by", function () {
  /**
   * Test Elevator.GetTimeToPassenger when is in stand-by.
   * - passenger is on the 6th floor and wants to get to the 5th floor
   * - elevator is in stand-by on the 1st floor.
   * - expected result:
   *  - the steps the elevator makes are:
   *    1. goes from floor 1 to floor 6: 5/elevator.speed secs pass
   *  - total amount of time the passenger has to wait for the elevator is: 5/elevator.speed secs
   */
  const passenger = new Passenger(undefined, 6, 5)
  const elevator = new Elevator(undefined, 1, 1)
  
  const timeToWait = elevator.GetTimeToPassenger(passenger)
  const expectedTimeToWait = 5 / elevator.speed
  
  expect(timeToWait).toEqual(expectedTimeToWait)
})

test("Test Elevator.GetTimeToPassenger when elevator is on the same floor with the passenger", function () {
  /**
   * Test Elevator.GetTimeToPassenger when is on the same floor with the passenger.
   * - passenger is on the 6th floor and wants to get to the 5th floor
   * - elevator is in stand-by on the 6th floor.
   * - expected result:
   *  - the elevator shouldn't do anything to get to the passenger
   *  - total amount of time the passenger has to wait for the elevator is: 0 secs
   */
  const passenger = new Passenger(undefined, 6, 5)
  const elevator = new Elevator(undefined, 6, 6)
  
  const timeToWait = elevator.GetTimeToPassenger(passenger)
  const expectedTimeToWait = 0
  
  expect(timeToWait).toEqual(expectedTimeToWait)
})

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
  expect(elevator.GetNumberOfStopsBetweenFloors(0, 15, [8])).toEqual(2)
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
