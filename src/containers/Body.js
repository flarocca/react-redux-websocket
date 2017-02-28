import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import { browserHistory } from 'react-router';

const OPTION_CLOSED = '70px';
const OPTION_OPENED = '180px';
const OPTION_JOIN_CLOSED = '70px';
const OPTION_JOIN_OPENED = '250px';
const DISPLAY_OPTION_CLOSED = 'none'
const DISPLAY_OPTION_OPENED = 'flex'
const BORDER_STYLE_RED = {
  borderColor: 'red',
  borderWidth: '3px',
  borderStyle: 'solid'
}
const BORDER_STYLE_NORMAL = {
  borderColor: 'transparent',
  borderWidth: '3px',
  borderStyle: 'solid'
}

class Body extends Component {
  constructor(props) {
    super(props);

    this._newChat = this._newChat.bind(this)
    this._joinToChat = this._joinToChat.bind(this)
    this._startNewChat = this._startNewChat.bind(this)
    this._joinToChatSelected = this._joinToChatSelected.bind(this);
    this._getName = this._getName.bind(this)
    this._getJoinId = this._getJoinId.bind(this)
    this._getJoinName = this._getJoinName.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.goToChatPage)
      browserHistory.push(nextProps.chatPageUrl);
  }

  render() {
    return (
      <div className='container column' >
        <div className='container column option' style={{ height: this.props.newChatSelected ? OPTION_OPENED : OPTION_CLOSED }}>
          <span onClick={this._newChat}>New Chat</span>
          <div className='container column inputContainer' style={{ display: this.props.newChatSelected ? DISPLAY_OPTION_OPENED : DISPLAY_OPTION_CLOSED }}>
            <input
              type='text'
              id='name'
              className='input'
              style={this.props.showErrorMessage ? BORDER_STYLE_RED : BORDER_STYLE_NORMAL}
              placeholder={'Enter your name'}
              ref='enterName' />
            <button
              type='button'
              className='button'
              onClick={this._startNewChat}>Go</button>
          </div>
        </div>
        <div className='container column option' style={{ height: this.props.joinChatSelected ? OPTION_JOIN_OPENED : OPTION_JOIN_CLOSED }}>
          <span onClick={this._joinToChat}>Join To Chat</span>
          <div className='container column inputContainer' style={{ display: this.props.joinChatSelected ? DISPLAY_OPTION_OPENED : DISPLAY_OPTION_CLOSED }}>
            <input
              type='text'
              id='join_id'
              className='input'
              style={this.props.showJoinIdErrorMessage ? BORDER_STYLE_RED : BORDER_STYLE_NORMAL}
              placeholder={'Enter chat id'}
              ref='join_id' />
            <input
              type='text'
              id='join_name'
              className='input'
              style={this.props.showJoinNameErrorMessage ? BORDER_STYLE_RED : BORDER_STYLE_NORMAL}
              placeholder={'Enter your name'}
              ref='join_name' />
            <button
              type='button'
              className='button'
              onClick={this._joinToChatSelected}>Go</button>
          </div>
        </div>
      </div>
    )
  }

  _getName() {
    return this.refs.enterName.value
  }

  _getJoinId() {
    return this.refs.join_id.value
  }

  _getJoinName() {
    return this.refs.join_name.value
  }

  _newChat() {
    this.props.dispatch(actions.newChat())
  }

  _joinToChat(id) {
    this.props.dispatch(actions.joinToChat(id))
  }

  _startNewChat(e) {
    e.preventDefault()
    let name = this._getName();
    this.props.dispatch(actions.createNewChat(name))
  }

  _joinToChatSelected(e) {
    e.preventDefault()
    let id = this._getJoinId();
    let name = this._getJoinName();
    this.props.dispatch(actions.startJoinToChat(id, name))
  }
}

let mapStateToProps = state => {
  return {
    newChatSelected: state.homeReducers.newChatSelected,
    joinChatSelected: state.homeReducers.joinChatSelected,
    showErrorMessage: state.homeReducers.showErrorMessage,
    showJoinIdErrorMessage: state.homeReducers.showJoinIdErrorMessage,
    showJoinNameErrorMessage: state.homeReducers.showJoinNameErrorMessage,
    chatid: state.homeReducers.chatid,
    participant: state.homeReducers.participant,
    goToChatPage: state.homeReducers.goToChatPage,
    chatPageUrl: state.homeReducers.chatPageUrl
  }
}

export default connect(mapStateToProps)(Body)
