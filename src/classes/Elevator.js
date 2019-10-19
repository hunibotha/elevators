import {DEFAULT_AVERAGE_ELEVATOR_STOP_TIME_S, DEFAULT_ELEVATOR_SPEED_FPS} from "../config/constants"
import {generateUniqueString} from "../utilities"
import Direction from "./Direction"

/**
 * @param id {string} - Unique id of the elevator.
 * @param currentFloor {int} - The floor the elevator is currently on.
 * @param destinationFloor {int} - The floor the elevator will finish its current delivery.
 * @param assignedPassengers {[Passenger]} - The passengers that should be delivered by the elevator.
 * their destination floor.
 * @returns {Elevator}
 */
export default class Elevator {
  
  _id
  _currentFloor
  _destinationFloor
  _assignedPassengers
  
  constructor(id = generateUniqueString(), currentFloor = 0, destinationFloor = 0, assignedPassengers = []) {
    this._id = id
    this._assignedPassengers = assignedPassengers
    this.currentFloor = currentFloor
    this.destinationFloor = destinationFloor
  }
  
  /**
   * Returns how many seconds it takes for the elevator to get to the specified passenger.
   * @param passenger {Passenger}
   * @returns {int}
   */
  GetTimeToPassenger(passenger) {
    if (this.CanPickUpPassenger(passenger)) {
      return
    }
    /**
     * Elevator finishes current delivery, then returns to the passenger.
     * |elevator.destinationFloor - elevator.currentFloor| + |elevator.destinationFloor - passenger.currentFloor|) /
     * elevator.speed + elevator.remainingStopFloors.length * elevator.averageStopTime
     */
    return (
      Math.abs(this.destinationFloor - this.currentFloor) +
      Math.abs(this.destinationFloor - passenger.currentFloor)
    ) / this.speed + this.GetNumberOfStopsBetweenFloors(this.currentFloor, this.destinationFloor) * this.averageStopTime
  }
  
  /**
   * Returns how many times the elevator has to stop between two floors based on the destination floors of the assigned
   * passengers. The startFloor and endFloor are included.
   * @param startFloor {int}
   * @param endFloor {int}
   * @returns {number}
   */
  GetNumberOfStopsBetweenFloors(startFloor, endFloor) {
    return this.assignedPassengers.reduce((stops, passenger) => {
      if ((passenger.destinationFloor - startFloor) * (passenger.destinationFloor - endFloor) <= 0) ++stops
      return stops
    }, 0)
  }
  
  /**
   * An elevator can pick-up a passenger if:
   * - elevator is in STAND-BY
   * - or elevator moves into the passenger's direction and:
   *  - the elevator won't pass the passenger's floor
   *  - or the elevator will pass the passenger's floor and the passenger wants to move in the elevator's delivery
   *  direction
   * In any other case elevator must finish it's current delivery to get back to the passenger.
   * @param passenger {Passenger}
   * @returns {boolean} - true if elevator can pick up the specified passenger
   */
  CanPickUpPassenger(passenger) {
    return this.direction === Direction.DIRECTIONS.NO_DIRECTION || // elevator is in STAND-BY
      (
        // elevator moving in the direction of the passenger
        this.IsMovingInTheDirectionOfThePassenger(passenger) && (
          // elevator won't pass the passenger's floor
          (passenger.currentFloor - this.currentFloor) * (passenger.currentFloor - this.destinationFloor) > 0 ||
          // elevator will pass the passenger's floor and the passenger wants to move in the elevator's delivery direction
          this.direction === passenger.direction
        )
      )
  }
  
  /**
   * An elevator moves in the direction of the passenger when:
   * - elevator is moving up, and it didn't pass the passenger's floor yet
   * - elevator is moving down, and it didn't pass the passenger's floor yet
   * @param passenger
   * @returns {boolean}
   */
  IsMovingInTheDirectionOfThePassenger(passenger) {
    return (
      this.direction === Direction.DIRECTIONS.UP && this.currentFloor <= passenger.currentFloor
    ) || (
      this.direction === Direction.DIRECTIONS.DOWN && this.currentFloor >= passenger.currentFloor
    )
  }
  
  /**
   * Assigns a single passenger to the elevator.
   * @param passenger {Passenger}
   */
  AssignPassenger(passenger) {
    this.assignedPassengers.push(passenger)
  }
  
  /**
   * Un-assigns a single passenger from the elevator.
   * @param unAssignedPassenger {Passenger}
   */
  UnAssignPassenger(unAssignedPassenger) {
    this._assignedPassengers = this.assignedPassengers.filter(({id}) => id !== unAssignedPassenger.id)
  }
  
  /**
   * Assigns multiple passengers to the elevator.
   * @param passengers {[Passenger]}
   */
  AssignPassengers(passengers) {
    this._assignedPassengers = this.assignedPassengers.concat(passengers)
  }
  
  get averageStopTime() {
    return DEFAULT_AVERAGE_ELEVATOR_STOP_TIME_S
  }
  
  get speed() {
    return DEFAULT_ELEVATOR_SPEED_FPS
  }
  
  /**
   * Gets the direction the elevator is currently heading to.
   * @returns {Direction.DIRECTIONS}
   */
  get direction() {
    return Direction.Calculate(this.currentFloor, this.destinationFloor)
  }
  
  /**
   * Unique id of the elevator.
   * @returns {string}
   */
  get id() {
    return this._id
  }
  
  /**
   * The passengers that should be delivered by the elevator.
   * @returns {[Passenger]}
   */
  get assignedPassengers() {
    return this._assignedPassengers
  }
  
  /**
   * The floor the elevator is currently on.
   * @returns {int}
   */
  get currentFloor() {
    return this._currentFloor
  }
  
  set currentFloor(currentFloor) {
    this._currentFloor = currentFloor
  }
  
  /**
   * The floor the elevator will finish its current delivery.
   * @returns {int}
   */
  get destinationFloor() {
    return this._destinationFloor
  }
  
  set destinationFloor(destinationFloor) {
    this._destinationFloor = destinationFloor
  }
  
}
