import React from "react"
import PropTypes from "prop-types"

const style = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: "#fff",
    padding: 15
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
}

const Modal = ({onClose, children}) => (
  <div style={style.container}>
    <div style={style.backgroundOverlay} onClick={onClose}/>
    <div style={style.contentContainer}>
      {children}
    </div>
  </div>
)

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Modal
