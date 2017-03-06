import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import HeaderChat from '../components/headerChat/HeaderChat'
import Footer from '../components/common/footer/Footer'
import ChatRoom from '../components/chatRoom/ChatRoom'
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
    this._sendMessage = this._sendMessage.bind(this)
    this._renderParticipant = this._renderParticipant.bind(this)
  }

  componentDidMount() {
    if (this.props.params.chatid && this.props.params.participantid) {
      this.props.dispatch(actions.getChat(this.props.params.chatid, this.props.params.participantid))
      this.props.dispatch(actions.openChatWebSocket(this.props.params.chatid, this.props.params.participantid))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reloadPage) {
      this.props.dispatch(actions.pageReloaded())
      browserHistory.push(nextProps.chatPageUrl)
      this.props.dispatch(actions.openChatWebSocket(this.props.params.chatid, this.props.params.participantid))
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
          <ChatRoom messages={this.props.messages} onSendClick={this._sendMessage} myId={this.props.params.participantid} />
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
          <li key={this.props.params.participantid} style={{ paddingTop: '10px', fontSize: '20px' }}>{'You'}</li>
          {this.props.chat.participants.map((participant) => { return this._renderParticipant(participant) })}
        </ul>
      )
    } else {
      return null
    }
  }

  _renderParticipant(participant) {
    if (parseInt(this.props.params.participantid, 10) === participant.id)
      return null

    return <li key={participant.id} style={{ paddingTop: '10px', fontSize: '20px' }}>{participant.name}</li>
  }

  _renderParticipantNameEntry() {
    if (!this.props.params.participantid && !this.props.participant) {
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

  _sendMessage(message) {
    this.props.dispatch(actions.sendMessage(this.props.params.chatid, this.props.params.participantid, message))
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
    chatPageUrl: state.chatReducers.chatPageUrl,
    reloadPage: state.chatReducers.reloadPage,
    messages: state.chatReducers.messages,
    sendingMessage: state.chatReducers.sendingMessage,
    errorSendingMessage: state.chatReducers.errorSendingMessage
  }
}

export default connect(mapStateToProps)(Chat)
