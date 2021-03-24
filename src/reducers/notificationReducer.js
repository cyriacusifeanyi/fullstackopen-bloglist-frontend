const notificationReducer = (state = { 'message': '', 'messageType': '' }, action) => {
  // console.log('state now: ', state)
  // console.log('ACTION: ', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'NOTIFICATION_TIMEOUT':
      return null
    default:
      return state
  }
}

let timeoutId = undefined

export const notificationChange = (message, timeout_in_sec) => {

  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, (timeout_in_sec * 1000))
  }
}

export const removeNotification = () => {
  return {
    type: 'NOTIFICATION_TIMEOUT'
  }
}

export default notificationReducer