import React from 'react'
import PropTypes from 'prop-types'
import {ElevatorShape} from "../shapes"

const style = {
  container: {
    display: 'flex',
    marginBottom: 5
  },
  description: {
    display: 'inline-block',
    borderBottom: '1px solid #EFEFEF',
    width: 200,
    marginRight: 10
  }
}

const ElevatorItem = ({elevator, onEdit, onDelete}) => (
  <li style={style.container}>
    <span style={style.description}>Elevator <b>#{elevator.id}</b></span>
    <button
      onClick={() => onEdit(elevator)}
      className="action-button info-button"
    >
      &#9998; Edit
    </button>
    <button
      onClick={() => onDelete(elevator)}
      className="action-button danger-button"
    >
      x Delete
    </button>
  </li>
)

ElevatorItem.propTypes = {
  elevator: ElevatorShape.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ElevatorItem
