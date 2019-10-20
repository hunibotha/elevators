import {DEFAULT_AVERAGE_ELEVATOR_STOP_TIME_S, DEFAULT_ELEVATOR_SPEED_FPS} from "../config/constants"
import {generateUniqueString, getAllIndexes} from "../utilities"
import {PermutateArray} from "../utilities/combinatorics"
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
   * Calculates how many seconds would take for the elevator to get to the specified passenger and deliver it to the
   * desired destination.
   * @param passenger {Passenger}
   * @returns {number}
   */
  GetTotalDeliveryTimeForPassenger(passenger) {
    // Simulating the delivery and measuring delivery time
    // 1. calculate the time it takes for the elevator to get to the passenger
    const {distance: tripToPassengerDistance, stops: tripToPassengerStops} = this.GetTripToPassenger(passenger)
    const timeToPassenger = tripToPassengerDistance / this.speed + tripToPassengerStops.length * this.averageStopTime
    // Simulate the elevator getting to the passenger
    // 2. remove the passengers that get down on the road to the passenger, but first back them up because this is a simulation
    const savedPassengers = this.assignedPassengers
    this._assignedPassengers = this.assignedPassengers.filter(
      passenger => !tripToPassengerStops.includes(passenger.destinationFloor)
    )
    // 3. change elevator currentFloor to the passenger's currentFloor but back-it up because this is a simulation
    const savedCurrentFloor = this.currentFloor
    this.currentFloor = passenger.currentFloor
    // 4. calculate the time it takes for the elevator to finish the delivery of the passenger
    const deliveryTimeOfPassenger = this.GetDeliveryTimeForPassenger(passenger)
    // 5. roll-back elevator to the original state(the state before the simulation)
    this._assignedPassengers = savedPassengers
    this.currentFloor = savedCurrentFloor
    
    return timeToPassenger + this.averageStopTime + deliveryTimeOfPassenger
  }
  
  /**
   * Calculates how many seconds would take for the elevator to deliver the specified passenger from the passenger's
   * current floor to the passenger's desired destination.
   * @param passenger {Passenger}
   * @returns {int}
   */
  GetDeliveryTimeForPassenger(passenger) {
    /**
     * Delivery time = (|passenger.destinationFloor - passenger.currentFloor|) / elevator.speed + (nr of stops between
     *  passenger.currentFloor and passenger.destinationFloor) * elevator.averageStopTime
     */
    return Math.abs(passenger.destinationFloor - passenger.currentFloor) / this.speed +
      this.GetNumberOfStopsBetweenFloors(
        passenger.currentFloor,
        passenger.destinationFloor,
        // the stops on the current floor and destination floor shouldn't be included
        [passenger.currentFloor, passenger.destinationFloor]
      ) * this.averageStopTime
  }
  
  /**
   * Calculates how many seconds would take for the elevator to get to the specified passenger.
   * @param passenger {Passenger}
   * @returns {int}
   */
  GetTimeToPassenger(passenger) {
    const {distance, stops} = this.GetTripToPassenger(passenger)
    
    return distance / this.speed + stops.length * this.averageStopTime
  }
  
  /**
   * Returns information about the trip the elevator has to make to get to the passenger.
   * @param passenger {Passenger}
   * @returns {{
   *   distance: {int},
   *   stops: {[int]}
   * }}
   */
  GetTripToPassenger(passenger) {
    if (this.CanPickUpPassenger(passenger)) {
      // Calculate trip info when elevator doesn't have to return for the passenger.
      return {
        distance: Math.abs(this.currentFloor - passenger.currentFloor),
        stops: this.GetStopsBetweenFloors(
          this.currentFloor,
          passenger.currentFloor,
          // the floor of the passenger should be excluded from the calculations
          [passenger.currentFloor]
        )
      }
    }
    
    // Calculate trip info for the case when elevator finishes current delivery, then returns to the passenger.
    return {
      distance: (
        Math.abs(this.destinationFloor - this.currentFloor) +
        Math.abs(this.destinationFloor - passenger.currentFloor)
      ),
      stops: this.GetStopsBetweenFloors(this.currentFloor, this.destinationFloor)
    }
  }
  
  /**
   * Returns how many times the elevator has to stop between two floors based on the destination floors of the assigned
   * passengers.
   * The startFloor and endFloor are included.
   * If multiple passengers go to the same floor it still counts for a single stop.
   * @param startFloor {int}
   * @param endFloor {int}
   * @param excludedFloors {[int]} - floors that should be excluded from the count
   * @returns {number}
   */
  GetNumberOfStopsBetweenFloors(startFloor, endFloor, excludedFloors = []) {
    return this.GetStopsBetweenFloors(startFloor, endFloor, excludedFloors).length
  }
  
  /**
   * Returns the stops the elevator makes between two floors based on the destination floors of the assigned
   * passengers.
   * The startFloor and endFloor are included.
   * If multiple passengers go to the same floor it still counts for a single stop.
   * @param startFloor {int}
   * @param endFloor {int}
   * @param excludedFloors {[int]} - floors that should be excluded from the count
   * @returns {[int]}
   */
  GetStopsBetweenFloors(startFloor, endFloor, excludedFloors = []) {
    return this.assignedPassengers.reduce((stops, passenger) => {
      if (
        !stops.includes(passenger.destinationFloor) &&
        !excludedFloors.includes(passenger.destinationFloor) &&
        (passenger.destinationFloor - startFloor) * (passenger.destinationFloor - endFloor) <= 0
      ) {
        stops.push(passenger.destinationFloor)
      }
      return stops
    }, [])
  }
  
  /**
   * An elevator can pick-up a passenger if:
   * - elevator is in stand-by
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
   * Calculates the minimum time it takes to deliver all the already assigned passengers and the passed passengers.
   * @param passengers {[Passenger]}
   * @returns {int}
   */
  GetTotalDeliveryTimeForPassengers(passengers) {
    return passengers.reduce((minimumDeliveryTime, firstPassenger) => {
      // 1. calculate the time it takes for the elevator to get to the first passenger
      const {distance: tripToPassengerDistance, stops: tripToPassengerStops} = this.GetTripToPassenger(firstPassenger)
      const timeToPassenger = tripToPassengerDistance / this.speed + tripToPassengerStops.length * this.averageStopTime
      // 2. get the rest of the destinations and calculate remaining delivery time from them
      // calculate the remaining destination floors left after getting to the passenger
      const remainingDestinationFloors = this.assignedPassengers.filter(
        passenger => !tripToPassengerStops.includes(passenger.destinationFloor)
      ).map(({destinationFloor}) => destinationFloor)
      // calculate start and destination floors of the passed passengers
      const passengerFloors = passengers.reduce((passengerFloors, passenger) => {
        const currentPassengerFloors = [passenger.destinationFloor]
        /** if the first passenger, don't add the currentFloor to the passengerFloors, because passenger.currentFloor is
         * the first floor and that doesn't require a permutation. */
        if (passenger.id !== firstPassenger.id) currentPassengerFloors.push(passenger.currentFloor)
        return passengerFloors.concat(currentPassengerFloors)
      }, [])
      // 3. calculate minimum delivery time when firstPassenger is the first passenger the elevator goes to
      const deliveryTime = timeToPassenger + this.CalculateMinimumDeliveryTimeOfDestinations(
        firstPassenger.currentFloor,
        remainingDestinationFloors.concat(passengerFloors),
        passengers.filter(passenger => passenger.id !== firstPassenger.id)
      )
      
      return deliveryTime < minimumDeliveryTime ? deliveryTime : minimumDeliveryTime
    }, Infinity)
  }
  
  /**
   * Calculates the minimum time it takes to go to all destinations, beginning from the startFloor.
   * @param startFloor {int} - the floor the delivery begins from
   * @param destinations {[int]} - destinations that must be reached
   * @param passengers {[Passenger]} - validity of permutation is checked based on the trips the passengers make.
   * @returns {int}
   */
  CalculateMinimumDeliveryTimeOfDestinations(startFloor, destinations, passengers) {
    // get all possible delivery orders(permutation of delivery destinations)
    const destinationPermutations = PermutateArray(destinations)
    return destinationPermutations.reduce((minimumDeliveryTime, permutation) => {
      // if the generated permutation doesn't include the trip of all passengers, we won't calculate the delivery time of the trip
      if (!this.isDeliveryOrderValid(destinations, passengers)) {
        return minimumDeliveryTime
      }
      // calculate time it takes for the elevator to reach all the floors in the permutation
      const deliveryTime = [startFloor].concat(permutation).reduce((totalDeliveryTime, floor, index, floors) => {
        // don't calculate time passed when we're on the first floor, or we're on the same floor as at the previous permutation
        if (index === 0 || (index !== 0 && floors[index - 1] !== floor)) return totalDeliveryTime
        // trip time is time passed by getting here from the previous floor + 1 stop time
        const currentTipTime = Math.abs(floor - floors[index - 1]) / this.speed + this.averageStopTime
        return totalDeliveryTime + currentTipTime
      }, 0)
      
      return deliveryTime < minimumDeliveryTime ? deliveryTime : minimumDeliveryTime
    }, Infinity)
  }
  
  /**
   * Checks if all the trips of the passengers are present in the correct order inside the destinations array
   * @param destinations {[int]}
   * @param passengers {[Passenger]}
   * @returns {boolean}
   */
  isDeliveryOrderValid(destinations, passengers) {
    for (let passenger in passengers) {
      const startFloorIndex = destinations.findIndex(passenger.currentFloor)
      const destinationFloorIndexes = getAllIndexes(destinations, passenger.destinationFloor)
      /** the delivery order is invalid if:
       * - passenger start and destination floors are not present in the destinations
       * - the start and destination floors aren't in the correct order: first the elevator should get to the the start
       * floor to pick up the user, then the destination floor)
       */
      if (
        startFloorIndex === -1 ||
        // no destinationFloor is not found after the startFloor
        destinationFloorIndexes.includes(destinationFloorIndex => destinationFloorIndex > startFloorIndex)
      ) return false
    }
    
    return true
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
