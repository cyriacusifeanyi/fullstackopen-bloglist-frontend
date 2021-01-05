import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.openButtonLabel}</button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>{props.closeButtonLabel}</button><br />
        {props.children}
      </span>
    </div>
  )
})

Togglable.propTypes = {
  openButtonLabel: PropTypes.string.isRequired,
  closeButtonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'

export default Togglable