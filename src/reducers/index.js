import { combineReducers } from 'redux'
import homeReducers from './homeReducers'
import chatReducers from './chatReducers'

const reducer = combineReducers({
  homeReducers,
  chatReducers
})

export default reducer
