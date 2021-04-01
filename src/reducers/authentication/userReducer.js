import storage from '../../utils/storage'

const userReducer = (state = null, action) => {

  switch (action.type) {
  case 'LOAD_USER':
    return action.data
  case 'LOGIN_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const loadUser = () => {
  return async dispatch => {
    const user = await storage.loadUser()
    dispatch({
      type: 'LOAD_USER',
      data: user,
    })
  }
}

export const loginUser = (user) => {
  return dispatch => {
    storage.saveUser(user)
    dispatch({
      type: 'LOGIN_USER',
      data: user,
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export default userReducer