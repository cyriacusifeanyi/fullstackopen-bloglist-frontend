import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({
  notificationMessage,
  messageType
}) => {
  if (notificationMessage === '') {
    return null
  }

  return (
    <div className={messageType}>
      {notificationMessage}
    </div>
  )
}

Notification.propTypes = {
  notificationMessage: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
}

export default Notification