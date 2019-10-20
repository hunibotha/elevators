import Building from "./Building"
import Passenger from "./Passenger"
import Elevator from "./Elevator";

const passenger1 = new Passenger()
const passenger2 = new Passenger()
const passenger3 = new Passenger()
const passenger4 = new Passenger()

test("Test Building.CallElevatorForPassenger", function () {
  const passengers = [
    // passengers in elevator1
    new Passenger(undefined, 0, 4),
    new Passenger(undefined, 0, 5),
    new Passenger(undefined, 0, 5),
    new Passenger(undefined, 0, 10),
    // passengers in elevator2
    new Passenger(undefined, 1, 6),
    new Passenger(undefined, 5, 15),
    // passengers in elevator3
    new Passenger(undefined, 19, 10),
    new Passenger(undefined, 20, 11),
    new Passenger(undefined, 20, 4),
    // passengers in elevator4
    new Passenger(undefined, 20, 0)
  ]
  
  const elevator1 = new Elevator(undefined, 1, 10, passengers.slice(0, 4))
  const elevator2 = new Elevator(undefined, 5, 15, passengers.slice(4, 6))
  const elevator3 = new Elevator(undefined, 19, 4, passengers.slice(6, 9))
  const elevator4 = new Elevator(undefined, 12, 0, passengers.slice(9, 10))
  const elevator5 = new Elevator(undefined, 20, 20) // elevator5 is idle
  
  const elevators = [elevator1, elevator2, elevator3, elevator4, elevator5]
  
  const building = new Building(
    20,
    elevators,
    passengers
  )
  
  // passenger1 should be delivered by elevator4
  const passenger1 = new Passenger(undefined, 0, 20)
  expect(building.CallElevatorForPassenger(passenger1)).toEqual(elevator4)
  
  // passenger2 should be delivered by elevator5
  const passenger2 = new Passenger(undefined, 18, 3)
  expect(building.CallElevatorForPassenger(passenger2)).toEqual(elevator5)
  
  // passenger3 should be delivered by elevator1
  const passenger3 = new Passenger(undefined, 3, 5)
  expect(building.CallElevatorForPassenger(passenger3)).toEqual(elevator1)
  
  // passenger4 should be delivered by elevator2
  const passenger4 = new Passenger(undefined, 5, 16)
  expect(building.CallElevatorForPassenger(passenger4)).toEqual(elevator2)
  
  // passenger5 should be delivered by elevator4
  const passenger5 = new Passenger(undefined, 5, 3)
  expect(building.CallElevatorForPassenger(passenger5)).toEqual(elevator4)
  
  // passenger6 should be delivered by elevator3
  const passenger6 = new Passenger(undefined, 13, 11)
  expect(building.CallElevatorForPassenger(passenger6)).toEqual(elevator3)
  
  // passenger7 should be delivered by elevator5
  const passenger7 = new Passenger(undefined, 13, 10)
  expect(building.CallElevatorForPassenger(passenger7)).toEqual(elevator5)
  
  // passenger8 should be delivered by elevator4
  const passenger8 = new Passenger(undefined, 0, 1)
  expect(building.CallElevatorForPassenger(passenger8)).toEqual(elevator4)
  
  // passenger9 should be delivered by elevator1
  const passenger9 = new Passenger(undefined, 1, 2)
  expect(building.CallElevatorForPassenger(passenger9)).toEqual(elevator1)
  
  // passenger10 should be delivered by elevator4
  const passenger10 = new Passenger(undefined, 5, 4)
  expect(building.CallElevatorForPassenger(passenger10)).toEqual(elevator4)
})

test("Test Building.AddPassenger", function () {
  const building = new Building(
    undefined,
    undefined,
    [passenger1, passenger2, passenger3]
  )
  
  building.AddPassenger(passenger4)
  expect(building.passengers).toEqual([passenger1, passenger2, passenger3, passenger4])
})

test("Test Building.RemovePassenger", function () {
  const building = new Building(
    undefined,
    undefined,
    [passenger1, passenger2, passenger3, passenger4]
  )
  
  building.RemovePassenger(passenger4)
  expect(building.passengers).toEqual([passenger1, passenger2, passenger3])
})
