import React from 'react'
import PropTypes from 'prop-types'

const NumberInput = ({label: labelProp, ...restProps}) => (
  <>
    {labelProp && <label>{labelProp}</label>}
    <input
      {...restProps}
      type="number"
    />
  </>
)

NumberInput.propTypes = {
  label: PropTypes.string
}

export default NumberInput
