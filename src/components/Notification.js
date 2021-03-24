import React from 'react'
// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(
    state => state.notification)

  // console.log(notification)

  if (!notification) {
    return null
  }

  return (
    <div className={notification.messageType}>
      {notification.message}
    </div>
  )
}

// Notification.propTypes = {
//   notification: PropTypes.shape({
//     message: PropTypes.string.isRequired,
//     messageType: PropTypes.string.isRequired,
//   }).isRequired
// }

export default Notification