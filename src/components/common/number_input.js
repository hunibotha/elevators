import React from "react"
import PropTypes from "prop-types"

const NumberInput = ({label: labelProp, ...restProps}) => (
  <>
    {labelProp && <label style={{display: 'inline-block', width: 150, fontWeight: 500}}>{labelProp}</label>}
    <input
      {...restProps}
      type="number"
      onChange={e => restProps.onChange && restProps.onChange(parseInt(e.currentTarget.value || 0))}
    />
  </>
)

NumberInput.propTypes = {
  label: PropTypes.string
}

export default NumberInput
