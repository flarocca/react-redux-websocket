import { combineReducers } from 'redux'
import homeReducers from './homeReducers'
import chatReducers from './chatReducers'
import websocketReducers from './websocketReducers'

const reducer = combineReducers({
  homeReducers,
  chatReducers,
  websocketReducers
})

export default reducer
