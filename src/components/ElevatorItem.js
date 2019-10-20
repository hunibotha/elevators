import React from 'react'
import PropTypes from 'prop-types'

const ElevatorItem = ({elevator, onEdit, onDelete}) => (
  <li>
    <span>Elevator #{elevator.id}</span>
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
  elevator: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default ElevatorItem
