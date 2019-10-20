import React, {useState} from "react"
import "./App.css"
import NumberInput from "./components/common/number_input"
import ElevatorItem from "./components/ElevatorItem"
import ElevatorEditForm from "./components/ElevatorEditForm"
import {generateUniqueString} from "./utilities"
import Level1Form from "./components/Level1Form"
import Level2Form from "./components/Level2Form"

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
  const [showLevel1Form, setShowLevel1Form] = useState(false)
  const [showLevel2Form, setShowLevel2Form] = useState(false)
  
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
  
  const canProceedToLevel = () => {
    if (!numberOfFloors || numberOfFloors <= 0 || !(elevators.length > 0)) {
      alert(`Please complete the 'Building data' form correctly!:
        - number of floors should be greater than 0
        - at least 1 elevator must be added`
      )
      return false
    }
    return true
  }
  
  const proceedToLevel1 = () => {
    if (canProceedToLevel()) setShowLevel1Form(true)
  }
  
  const proceedToLevel2 = () => {
    if (canProceedToLevel()) setShowLevel2Form(true)
  }
  
  return (
    <div className="App">
      <h1>ELEVATOR PROBLEM</h1>
      <form
        className="building-form"
        action="#"
      >
        <fieldset>
          <legend>Building data*</legend>
          <NumberInput
            label="Number of floors: "
            value={numberOfFloors}
            onChange={numberOfFloors => setNumberOfFloors(numberOfFloors)}
          />
          <br/><br/>
          <p>Elevators:</p>
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
            className="action-button success-button"
            onClick={addElevator}
          >
            + Add elevator
          </button>
        </fieldset>
      </form>
      <div>
        <h2>Execute solutions</h2>
        <button
          className="action-button"
          onClick={proceedToLevel1}
        >
          Level 1
        </button>
        <button
          className="action-button"
          onClick={proceedToLevel2}
        >
          Level 2
        </button>
      </div>
      {editedElevator && (
        <ElevatorEditForm
          key={editedElevator.id}
          elevator={editedElevator}
          onSave={editElevator}
          onCancel={finishElevatorEdit}
          highestFloor={numberOfFloors}
        />
      )}
      {showLevel1Form && (
        <Level1Form
          numberOfFloors={numberOfFloors}
          elevators={elevators}
          onCancel={() => setShowLevel1Form(false)}
        />
      )}
      {showLevel2Form && (
        <Level2Form
          numberOfFloors={numberOfFloors}
          elevators={elevators}
          onCancel={() => setShowLevel2Form(false)}
        />
      )}
    </div>
  )
}

export default App
