import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './ChatRoom.css'
import Send from '../../images/Send'
import Message from './Message'

export default class ChatRoom extends Component {
  constructor(props) {
    super(props)

    this._sendMessage = this._sendMessage.bind(this)
    this._renderMessages = this._renderMessages.bind(this)
    this._getMessage = this._getMessage.bind(this)
    this._keyPressed = this._keyPressed.bind(this)
    this._scrollToBottom = this._scrollToBottom.bind(this)
  }

  componentDidMount() {
    this._scrollToBottom();
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  render() {
    return (
      <div className='container column chat-room'>
        <div className='container message-list' >
          {this._renderMessages(parseInt(this.props.myId, 10))}
        </div>
        <div className='container row send-message'>
          <input
            type='text'
            id='message'
            className='input-message'
            placeholder={'Type your message...'}
            ref='message'
            onKeyPress={this._keyPressed} />
          <button className='send-msg-btn' onClick={this._sendMessage}>
            <Send innerColor='white' className='send-icon' />
          </button>
        </div>
      </div>
    )
  }

  _keyPressed(e) {
    if (e.key === 'Enter') {
      this._sendMessage(e)
    }
  }

  _sendMessage(e) {
    e.preventDefault()
    let message = this._getMessage()
    this.props.onSendClick(message)
    this.refs.message.value = null
    this.refs.message.focus()
  }

  _renderMessages(myId) {
    if (this.props.messages) {
      return (
        <ul className='list'>
          {this.props.messages.map(function (message) {
            let className = (myId !== message.participant.id) ? 'msg-left' : 'msg-right'
            let name = (myId !== message.participant.id) ? message.participant.name : 'You'
            return (
              <Message
                className={className}
                timestamp={message.timestamp}
                name={name}
                message={message.message}
                key={message.timestamp} />
            )
          })}
          <div style={{ float: "left", clear: "both" }} ref={(el) => { this._messagesEnd = el; }} />
        </ul>
      )
    } else {
      return null
    }
  }

  _getMessage() {
    return this.refs.message.value
  }

  _scrollToBottom() {
    const node = ReactDOM.findDOMNode(this._messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }
}
