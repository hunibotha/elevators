import React, {useState} from 'react'
import PropTypes from 'prop-types'
import NumberInput from "./common/number_input";

const ElevatorEditForm = ({elevator, onSave, onCancel, highestFloor}) => {
  const [currentFloor, setCurrentFloor] = useState(elevator.currentFloor)
  const [destinationFloor, setDestinationFloor] = useState(elevator.destinationFloor)
  const [stops, setStops] = useState(elevator.stops)
  const [addedStop, setAddedStop] = useState("")
  
  const validateFloor = (floor, floorname) => {
    if (!(floor >= 0 && floor <= highestFloor)) {
      alert(`Invalid ${floorname} value: floor should be a number between 0 and the number of floors in the building (${highestFloor})`)
      return false
    }
    
    return true
  }
  
  const removeStop = removedStop => setStops(stops.filter(stop => stop !== removedStop))
  const addStop = () => {
    if ((addedStop || addedStop === 0) && !addedStop < 0 && addedStop <= highestFloor && !stops.includes(addedStop)) {
      setStops([...stops, addedStop])
      setAddedStop("")
    } else {
      alert(`Invalid stop: added stop should be a number between 0 and the number of floors in the building (${highestFloor})`)
    }
  }
  
  const saveElevator = () => {
    if(validateFloor(currentFloor, "Current floor") && validateFloor(destinationFloor, "Destination floor")){
      onSave({
        id: elevator.id,
        currentFloor,
        destinationFloor,
        stops
      })
    }
  }
  
  return (
    <form action="#">
      <fieldset>
        <legend>Editing elevator #{elevator.id}</legend>
        <div>
          <NumberInput
            label="Current floor: "
            value={currentFloor}
            onChange={e => setCurrentFloor(parseInt(e.target.value || 0))}
          />
        </div>
        <div>
          <NumberInput
            label="Destination floor: "
            value={destinationFloor}
            onChange={e => setDestinationFloor(parseInt(e.target.value || 0))}
          />
        </div>
        <h4>Stops(floors the elevator will stop on):</h4>
        <div>
          {stops.map(stop => (
            <span
              key={stop}
              title="Click to remove"
              onClick={() => removeStop(stop)}
              className="elevator-stop"
            >
              {stop}
            </span>
          ))}
          <div>
            <NumberInput
              value={addedStop}
              onChange={e => setAddedStop(parseInt(e.target.value || 0))}
            />
            <button
              className="success-button"
              onClick={addStop}
            >
              + Add stop
            </button>
          </div>
        </div>
      </fieldset>
      <button
        onClick={saveElevator}
        className="action-button success-button"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="action-button info-button"
      >
        Cancel
      </button>
    </form>
  )
}

ElevatorEditForm.propTypes = {
  elevator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    currentFloor: PropTypes.number.isRequired,
    destinationFloor: PropTypes.number.isRequired,
    stops: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  highestFloor: PropTypes.number.isRequired
}

export default ElevatorEditForm
