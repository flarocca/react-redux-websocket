import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import HeaderChat from '../components/headerChat/HeaderChat'
import Footer from '../components/common/footer/Footer'
import Send from '../images/Send'
import * as actions from '../actions/index'
import ActivityIndicator from '../components/common/ActivityIndicator'
import { browserHistory } from 'react-router'

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

class Chat extends Component {
  constructor(props) {
    super(props)

    this._renderLoadingChat = this._renderLoadingChat.bind(this)
    this._renderParticipants = this._renderParticipants.bind(this)
    this._renderParticipantNameEntry = this._renderParticipantNameEntry.bind(this)
    this._nameCompleted = this._nameCompleted.bind(this)
    this._getName = this._getName.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.chatid && this.props.params.participantid) {
      this.props.dispatch(actions.getChat(this.props.params.chatid, this.props.params.participantid))
      // this.props.dispatch(actions.openChatWebSocket())
    } else if (nextProps.participant) {
      browserHistory.push(nextProps.chatPageUrl)
    }
  }

  render() {
    return (
      <div className='Chat column'>
        <HeaderChat chatid={this.props.params.chatid} />
        <div className='chat-board row'>
          <div className='container member-list'>
            {this._renderLoadingChat()}
            {this._renderParticipants()}
          </div>
          <div className='container column chat-room'>
            <div className='container message-list' />
            <div className='container row send-message'>
              <textarea
                type='text'
                id='join_id'
                className='input-message'
                placeholder={'Type your message...'}
                ref='join_id' />
              <button className='send-msg-btn'><Send innerColor='white' className='send-icon' /></button>
            </div>
          </div>
        </div>
        {this._renderParticipantNameEntry()}
        <Footer />
      </div>
    )
  }

  _renderLoadingChat() {
    if (this.props.loadingChatInfo) {
      return (
        <ActivityIndicator title={'Loading chat info...'} />
      )
    } else {
      return null
    }
  }

  _renderParticipants() {
    if (!this.props.loadingChatInfo && !this.props.errorLoadingChat && this.props.chat) {
      return (
        <ul>
          {this.props.chat.participants.map(function (participant) {
            return <li>{participant.name}</li>
          })}
        </ul>
      )
    } else {
      return null
    }
  }

  _renderParticipantNameEntry() {
    if (!this.props.params.participantid) {
      return (
        <div className='modal'>
          <div className='container column optionModal'>
            <div className='container column inputModal'>
              <input
                type='text'
                id='name'
                className='input'
                style={this.props.errorAddingParticipant ? BORDER_STYLE_RED : BORDER_STYLE_NORMAL}
                placeholder={'Enter your name'}
                ref='enterName' />
              <button
                type='button'
                className='button'
                onClick={this._nameCompleted}>Go</button>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  _nameCompleted(e) {
    e.preventDefault()
    let name = this._getName()
    this.props.dispatch(actions.addParticipant(this.props.params.chatid, name))
  }

  _getName() {
    return this.refs.enterName.value
  }
}

let mapStateToProps = state => {
  return {
    loadingChatInfo: state.chatReducers.loadingChatInfo,
    addingParticipant: state.chatReducers.addingParticipant,
    errorLoadingChat: state.chatReducers.errorLoadingChat,
    errorAddingParticipant: state.chatReducers.errorAddingParticipant,
    participant: state.chatReducers.participant,
    chat: state.chatReducers.chat,
    chatPageUrl: state.chatReducers.chatPageUrl
  }
}

export default connect(mapStateToProps)(Chat)
