import React, {useState} from "react"
import PropTypes from "prop-types"
import NumberInput from "./common/number_input"
import Modal from "./common/modal";

const style = {
  stopContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 480,
    marginBottom: 10
  },
  stopTitle: {
    fontWeight: 500
  }
}

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
    if ((addedStop || addedStop === 0) && !(addedStop < 0) && addedStop <= highestFloor && !stops.includes(addedStop)) {
      setStops([...stops, addedStop])
      setAddedStop("")
    } else {
      alert(`Invalid stop: added stop should be a number between 0 and the number of floors in the building (${highestFloor})`)
    }
  }
  
  const saveElevator = () => {
    if (validateFloor(currentFloor, "Current floor") && validateFloor(destinationFloor, "Destination floor")) {
      onSave({
        id: elevator.id,
        currentFloor,
        destinationFloor,
        stops
      })
    }
  }
  
  return (
    <Modal onClose={onCancel}>
      <form action="#">
        <fieldset>
          <legend>Editing elevator <b>#{elevator.id}</b></legend>
          <div>
            <NumberInput
              label="Current floor: "
              value={currentFloor}
              onChange={currentFloor => setCurrentFloor(currentFloor)}
            />
          </div>
          <div>
            <NumberInput
              label="Destination floor: "
              value={destinationFloor}
              onChange={destinationFloor => setDestinationFloor(destinationFloor)}
            />
          </div>
          <br/>
          <p style={style.stopTitle}>Stops(floors the elevator will stop on):</p>
          <div style={style.stopContainer}>
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
          </div>
          <div>
            <NumberInput
              value={addedStop}
              onChange={addedStop => setAddedStop(addedStop)}
            />
            <button
              className="action-button success-button"
              onClick={addStop}
            >
              + Add stop
            </button>
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
    </Modal>
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
