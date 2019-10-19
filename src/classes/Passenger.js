import {generateUniqueString} from "../utilities"
import Direction from "./Direction"

/**
 * @param id {string} - Unique id of the passenger.
 * @param currentFloor {int} - The floor the passenger is currently on.
 * @param destinationFloor {int} - The floor the passenger is heading to.
 * @returns {Passenger}
 */
export default class Passenger {
  _id
  _currentFloor
  _destinationFloor
  
  constructor(id = generateUniqueString(), currentFloor = 0, destinationFloor = 0) {
    this._id = id
    this.currentFloor = currentFloor
    this.destinationFloor = destinationFloor
  }
  
  /**
   * Gets the direction the passenger is heading to.
   * @returns {Direction.UP | Direction.NO_DIRECTION | Direction.DOWN}
   */
  get direction() {
    return Direction.Calculate(this.destinationFloor, this.currentFloor)
  }
  
  /**
   * Unique id of the passenger.
   * @returns {string}
   */
  get id() {
    return ""
  }
  
  /**
   * The floor the passenger is currently on.
   * @returns {int}
   */
  get currentFloor() {
    return this._currentFloor
  }
  
  set currentFloor(currentFloor) {
    this._currentFloor = currentFloor
  }
  
  /**
   * The floor the passenger is heading to.
   * @returns {int}
   */
  get destinationFloor() {
    return this._destinationFloor
  }
  
  set destinationFloor(destinationFloor) {
    this._destinationFloor = destinationFloor
  }
}
