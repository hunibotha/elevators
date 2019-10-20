import React from "react"
import PropTypes from "prop-types"
import {ElevatorShape} from "../shapes"
import Modal from "./common/modal"

const Level2Form = ({numberOfFloors, elevators, onCancel}) => (
  <Modal onClose={onCancel}>
    <p>Level 2 form</p>
  </Modal>
)

Level2Form.propTypes = {
  numberOfFloors: PropTypes.number.isRequired,
  elevators: PropTypes.arrayOf(ElevatorShape).isRequired,
  onCancel: PropTypes.func.isRequired
}

export default Level2Form
