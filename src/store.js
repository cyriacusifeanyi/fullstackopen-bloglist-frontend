import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'


// // incase of combining reducer:
const rootReducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

// store.subscribe(() => {
//   console.log('State after dispatch: ', store.getState())
// })

export default store