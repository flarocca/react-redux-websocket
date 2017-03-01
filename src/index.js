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
      <Route path='/' component={App} />
      <Route path='/chat/:chatid/participant/:participantid' component={Chat} />
      <Route path='/chat/:chatid' component={Chat} />
      <Route path='*' component={NoMatch} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
