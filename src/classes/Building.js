/**
 * @param numberOfFloors {int} - number of floors inside the building
 * @param elevators {[Elevator]} - the elevators inside the building
 * @param passengers {[Passenger]} - the passengers inside the building
 * @returns {Building}
 */
import Passenger from "./Passenger";

export default class Building {
  
  _numberOfFloors
  _elevators
  _passengers
  
  constructor(numberOfFloors = 0, elevators = [], passengers = []) {
    this.numberOfFloors = numberOfFloors
    this.elevators = elevators
    this.passengers = passengers
  }
  
  /**
   * Returns the elevator, that delivers the passenger the fastest.
   * @param passenger {Passenger}
   * @returns {Elevator}
   */
  CallElevatorForPassenger(passenger) { // Level 1
    return this.elevators.reduce(({bestElevatorDeliveryTime, bestElevator}, elevator) => {
      const elevatorDeliveryTime = elevator.GetTotalDeliveryTimeForPassenger(passenger)
      if(!process.env.NODE_ENV === 'test'){
        console.log(`Elevator ${elevator.id} can deliver passenger ${passenger.id} under ${elevatorDeliveryTime} seconds`)
      }
      
      return elevatorDeliveryTime < bestElevatorDeliveryTime ?
        {bestElevatorDeliveryTime: elevatorDeliveryTime, bestElevator: elevator} :
        {bestElevatorDeliveryTime, bestElevator}
    }, {
      bestElevatorDeliveryTime: 999999,
      bestElevator: null
    }).bestElevator
  }
  
  DeliverRandomNumberOfPassengers(){ // Level 2
    // generate the number of passengers
    const nrOfPassengers = Math.floor(Math.random() * 5) + 5;
    console.log('Number of passengers:', nrOfPassengers)
    // generate a number of nrOfPassengers passengers
    const passengers = (new Array(nrOfPassengers)).fill(0).map(() => {
      // generate passenger start and destination floors
      const startFloor = this.GenerateRandomFloor()
      let destinationFloor = this.GenerateRandomFloor(startFloor)
      // create passenger instance
      const passenger = new Passenger(undefined, startFloor, destinationFloor)
      console.log(passenger.toString())
      return passenger
    })
    
    // just test
    //console.log('delivery time of passengers:', this.elevators[4].GetTotalDeliveryTimeForPassengers(passengers))
  }
  
  /**
   * Returns a random floor inside the building.
   * @param excludeFloor {int} - if the randomly generated floor equals this floor, a new floor is generated
   */
  GenerateRandomFloor(excludeFloor){
    const floor = Math.floor(Math.random() * (this.numberOfFloors - 1))
    if(floor === excludeFloor){
      return this.GenerateRandomFloor(excludeFloor)
    }
    
    return floor
  }
  
  /**
   * Add a passenger to the building.
   * @param passenger {Passenger}
   */
  AddPassenger(passenger) {
    this.passengers.push(passenger)
  }
  
  /**
   * Remove a passenger from the building.
   * @param removedPassenger {Passenger}
   */
  RemovePassenger(removedPassenger) {
    this.passengers = this.passengers.filter(({id}) => id !== removedPassenger.id)
  }
  
  /**
   * Number of floors inside the building.
   * @returns {int}
   */
  get numberOfFloors() {
    return this._numberOfFloors
  }
  
  set numberOfFloors(numberOfFloors) {
    this._numberOfFloors = numberOfFloors
  }
  
  /**
   * Elevators inside the building.
   * @returns {[Elevator]}
   */
  get elevators() {
    return this._elevators
  }
  
  set elevators(elevators) {
    this._elevators = elevators
  }
  
  /**
   * Passengers inside the building.
   * @returns {[Passenger]}
   */
  get passengers() {
    return this._passengers
  }
  
  set passengers(passengers) {
    this._passengers = passengers
  }
}
