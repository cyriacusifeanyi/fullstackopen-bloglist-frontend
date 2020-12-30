  
import React from 'react'

const Notification = ({ notificationMessage, messageType}) => {
  if (notificationMessage === null) {
    return null
  }

  return (
    <div className={messageType}>
      {notificationMessage}
    </div>
  )
}

export default Notification