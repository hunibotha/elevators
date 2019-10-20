import React, {useState} from "react"
import PropTypes from "prop-types"
import {ElevatorShape} from "../shapes"
import Modal from "./common/modal"
import NumberInput from "./common/number_input"
import Building from "../classes/Building";
import Elevator from "../classes/Elevator";
import Passenger from "../classes/Passenger";

const Level1Form = ({numberOfFloors, elevators, onCancel}) => {
  const [startFloor, setStartFloor] = useState(0)
  const [destinationFloor, setDestinationFloor] = useState(0)
  
  const canExecuteLevel = () => {
    if (startFloor >= 0 && destinationFloor >= 0 && startFloor <= numberOfFloors && destinationFloor <= numberOfFloors
      && startFloor !== destinationFloor
    ) {
      return true
    }
    
    alert(`Invalid passenger info: \n- start and destination floors should be >= 0 ` +
      `\n- start and destination floors should be <= the number of floors inside the building (${numberOfFloors})` +
      `\n- start and destination floors shouldn't be equal`)
    
    return false
  }
  
  const executeLevel1 = () => {
    if (canExecuteLevel()) {
      const building = new Building(
        numberOfFloors,
        elevators.map(({id, currentFloor, destinationFloor, stops}) => new Elevator(
          id,
          currentFloor,
          destinationFloor,
          stops.map(stop => new Passenger(undefined, undefined, stop))
        ))
      )
      const targetPassenger = new Passenger(undefined, startFloor, destinationFloor)
      
      const bestElevator = building.CallElevatorForPassenger(targetPassenger)
      
      alert(`The relevant elevator(#${bestElevator.id}) was called for the passenger ${targetPassenger.id}. \nPlease look at the console for more details!`)
    }
  }
  
  return (
    <Modal onClose={onCancel}>
      <form action="#">
        <fieldset>
          <legend>Level <b>1</b>: Passenger data</legend>
          <div>
            <NumberInput
              label="Passenger start floor: "
              value={startFloor}
              onChange={currentFloor => setStartFloor(currentFloor)}
            />
          </div>
          <div>
            <NumberInput
              label="Passenger destination floor: "
              value={destinationFloor}
              onChange={destinationFloor => setDestinationFloor(destinationFloor)}
            />
          </div>
        </fieldset>
        <button
          onClick={executeLevel1}
          className="action-button success-button"
        >
          Call elevator for passenger!
        </button>
        <button
          onClick={onCancel}
          className="action-button info-button"
        >
          Cancel
        </button>
      </form>
    </Modal>
  )
}

Level1Form.propTypes = {
  numberOfFloors: PropTypes.number.isRequired,
  elevators: PropTypes.arrayOf(ElevatorShape).isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Level1Form
