import PropTypes from 'prop-types'

export const ElevatorShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  currentFloor: PropTypes.number.isRequired,
  destinationFloor: PropTypes.number.isRequired,
  stops: PropTypes.arrayOf(PropTypes.number).isRequired
})
