import React from "react"
import logo from "./logo.svg"
import "./App.css"
import Passenger from "./classes/Passenger"
import Elevator from "./classes/Elevator"
import Building from "./classes/Building"

const passengers = [
  // passengers in elevator1
  new Passenger(undefined, 0, 4),
  new Passenger(undefined, 0, 5),
  new Passenger(undefined, 0, 5),
  new Passenger(undefined, 0, 10),
  // passengers in elevator2
  new Passenger(undefined, 1, 6),
  new Passenger(undefined, 5, 15),
  // passengers in elevator3
  new Passenger(undefined, 19, 10),
  new Passenger(undefined, 20, 11),
  new Passenger(undefined, 20, 4),
  // passengers in elevator4
  new Passenger(undefined, 20, 0)
]

const elevator1 = new Elevator(undefined, 1, 10, passengers.slice(0, 4))
const elevator2 = new Elevator(undefined, 5, 15, passengers.slice(4, 6))
const elevator3 = new Elevator(undefined, 19, 4, passengers.slice(6, 9))
const elevator4 = new Elevator(undefined, 12, 0, passengers.slice(9, 10))
const elevator5 = new Elevator(undefined, 20, 20) // elevator5 is idle

const elevators = [elevator1, elevator2, elevator3, elevator4, elevator5]

const building = new Building(
  20,
  elevators,
  passengers
)

building.DeliverRandomNumberOfPassengers()

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App
