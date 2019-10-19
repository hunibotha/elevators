import Elevator from "./Elevator"
import Passenger from "./Passenger"

const passenger1 = new Passenger()
const passenger2 = new Passenger()
const passenger3 = new Passenger()
const passenger4 = new Passenger()

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
