export default class Direction {
  /**
   * Enum for possible direction values.
   * @readonly
   * @enum {int}
   */
  static DIRECTIONS = {
    UP: 1,
    NO_DIRECTION: 0,
    DOWN: -1
  }
  
  /**
   * Calculates direction based on a start and destination floor.
   * @param destinationFloor {int}
   * @param startFloor {int}
   * @returns {Direction.DIRECTIONS}
   */
  static Calculate(startFloor, destinationFloor) {
    const difference = destinationFloor - startFloor
    
    if (difference === 0) return Direction.DIRECTIONS.NO_DIRECTION
    
    return Math.abs(difference) / difference
  }
}
