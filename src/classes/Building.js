/**
 * @param numberOfFloors {int} - number of floors inside the building
 * @param elevators {[Elevator]} - the elevators inside the building
 * @param passengers {[Passenger]} - the passengers inside the building
 * @returns {Building}
 */
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
  CallElevatorForPassenger(passenger) {
    return
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
