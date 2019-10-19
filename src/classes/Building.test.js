import Building from "./Building"
import Passenger from "./Passenger"

const passenger1 = new Passenger()
const passenger2 = new Passenger()
const passenger3 = new Passenger()
const passenger4 = new Passenger()

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

test("Test Building.CallElevatorForPassenger", function () {
  
  // TODO: write test before implementing this function
  expect(1).toEqual(0)
})
