import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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
}

export default Togglable