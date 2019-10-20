import React, {useState} from "react"
import "./App.css"
import Building from "./classes/Building"
import NumberInput from "./components/common/number_input"
import ElevatorItem from "./components/ElevatorItem"
import ElevatorEditForm from "./components/ElevatorEditForm"
import {generateUniqueString} from "./utilities"

const CreateElevator = () => ({
  id: generateUniqueString(),
  currentFloor: 0,
  destinationFloor: 0,
  stops: []
})

const App = () => {
  const [numberOfFloors, setNumberOfFloors] = useState(0)
  const [elevators, setElevators] = useState([])
  const [editedElevator, setEditedElevator] = useState(null)
  
  const addElevator = () => {
    const newElevator = CreateElevator()
    setElevators([...elevators, newElevator])
    setEditedElevator(newElevator)
  }
  const removeElevator = removedElevator => setElevators(elevators.filter(({id}) => id !== removedElevator.id))
  const editElevator = editedElevator => {
    setElevators(
      elevators.map(elevator => elevator.id === editedElevator.id ? editedElevator : elevator)
    )
    finishElevatorEdit()
  }
  const finishElevatorEdit = () => setEditedElevator(null)
  
  return (
    <div className="App">
      <h1>ELEVATOR PROBLEM</h1>
      <form
        className="building-form"
        action="#"
      >
        <fieldset>
          <legend>Building</legend>
          <NumberInput
            label="Number of floors: "
            value={numberOfFloors}
            onChange={e => setNumberOfFloors(parseInt(e.target.value || 0))}
          />
          <h4>Elevators:</h4>
          {elevators.map((elevator) => {
            return (
              <ElevatorItem
                key={elevator.id}
                elevator={elevator}
                onDelete={removeElevator}
                onEdit={setEditedElevator}
              />
            )
          })}
          <button
            className="success-button"
            onClick={addElevator}
          >
            + Add elevator
          </button>
        </fieldset>
      </form>
      {editedElevator && (
        <ElevatorEditForm
          key={editedElevator.id}
          elevator={editedElevator}
          onSave={editElevator}
          onCancel={finishElevatorEdit}
          highestFloor={numberOfFloors}
        />
      )}
    </div>
  )
}

export default App
