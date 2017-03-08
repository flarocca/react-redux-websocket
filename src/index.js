import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import Chat from './containers/Chat'
import NoMatch from './containers/NoMatch'
import './index.css'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/examples/react-redux-websocket' component={App} />
      <Route path='/examples/react-redux-websocket/chat/:chatid/participant/:participantid' component={Chat} />
      <Route path='/examples/react-redux-websocket/chat/:chatid' component={Chat} />
      <Route path='/examples/react-redux-websocket/*' component={NoMatch} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
