import React, { Component } from 'react'
import './HeaderChat.css'

export default class HeaderChat extends Component {
  render() {
    return (
      <div className='container column header-chat'>
        <h1 id='header-chat-title'>{'React Redux WebSocket - Chat room ' + this.props.chatid}</h1>
      </div>
    )
  }
}
