import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import notificationReducer from './reducers/notificationReducer'


// // incase of combining reducer:
const rootReducer = combineReducers({
  // anecdotes: anecdoteReducer,
  notification: notificationReducer,
  // filter: filterReducer
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