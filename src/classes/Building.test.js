import Building from "./Building"
import Passenger from "./Passenger"

test("Test Building.AddPassenger", function () {
  const passenger1 = new Passenger()
  const passenger2 = new Passenger()
  const passenger3 = new Passenger()
  const passenger4 = new Passenger()
  
  const building = new Building(
    undefined,
    undefined,
    [passenger1, passenger2, passenger3]
  )
  
  building.AddPassenger(passenger4)
  expect(building.passengers).toEqual([passenger1, passenger2, passenger3, passenger4])
})
