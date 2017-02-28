import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className='container column header'>
        <h1>React Redux WebSocket</h1>
        <p className='header-text'>
          This is an example of a simple Chat using ReactJS, Redux and Socket.io. In this example you will see how WebSockets work and one way to implement them.
          The whole code is public <a target='_blank' className='repo-link' href={'https://github.com/flarocca/react-redux-websocket'}>here</a>.
        </p>
      </div>
    )
  }
}
