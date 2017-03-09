import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import HeaderChat from '../components/headerChat/HeaderChat'
import ChatRoom from '../components/chatRoom/ChatRoom'
import * as actions from '../actions/index'
import ActivityIndicator from '../components/common/ActivityIndicator'
import { browserHistory } from 'react-router'
import ModalMessage from '../components/common/ModalMessage'
import EntryParticipantName from '../components/chatRoom/EntryParticipantName'

class Chat extends Component {
  constructor(props) {
    super(props)

    this._renderLoadingChat = this._renderLoadingChat.bind(this)
    this._renderParticipants = this._renderParticipants.bind(this)
    this._renderParticipantNameEntry = this._renderParticipantNameEntry.bind(this)
    this._nameCompleted = this._nameCompleted.bind(this)
    this._sendMessage = this._sendMessage.bind(this)
    this._renderParticipant = this._renderParticipant.bind(this)
    this._renderGotoHome = this._renderGotoHome.bind(this)
    this._return = this._return.bind(this)
    this._exitGroup = this._exitGroup.bind(this)
  }

  componentDidMount() {
    if (this.props.params.chatid && this.props.params.participantid) {
      this.props.dispatch(actions.getChatInfo(this.props.params.chatid, this.props.params.participantid))
      this.props.dispatch(actions.openChatWebSocket(this.props.params.chatid, this.props.params.participantid))
    } else if (this.props.params.chatid) {
      this.props.dispatch(actions.getChat(this.props.params.chatid))
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
          <div className='container column left-panel'>
            <div className='container member-list'>
              {this._renderParticipants()}
            </div>
            <div className='container column'>
              <button
                type='button'
                className='exit-button'
                onClick={this._exitGroup}>Exit Group</button>
            </div>
          </div>
          <ChatRoom messages={this.props.messages} onSendClick={this._sendMessage} myId={this.props.params.participantid} />
        </div>
        {this._renderLoadingChat()}
        {this._renderParticipantNameEntry()}
        {this._renderGotoHome()}
      </div>
    )
  }

  _renderLoadingChat() {
    if (this.props.loadingChat) {
      return (
        <ActivityIndicator title={'Loading chat info...'} />
      )
    } else {
      return null
    }
  }

  _renderParticipants() {
    if (this.props.params.participantid && !this.props.loadingChat && !this.props.loadingChatInfo && !this.props.errorLoadingChat && this.props.chat) {
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
    if (this.props.loadingChat || this.props.errorLoadingChat)
      return null

    if (!this.props.params.participantid && !this.props.participant) {
      return (
        <EntryParticipantName placeholder={'Enter your name'} showError={this.props.errorAddingParticipant} onClick={this._nameCompleted} />
      )
    } else {
      return null
    }
  }

  _renderGotoHome() {
    if (this.props.goToHome) {
      return (
        <ModalMessage onClick={this._return} message={'Chat does not exist.'} />
      )
    } else {
      return null
    }
  }

  _nameCompleted(name) {
    this.props.dispatch(actions.addParticipant(this.props.params.chatid, name))
  }

  _return() {
    browserHistory.push('/examples/react-redux-websocket')
  }

  _sendMessage(message) {
    this.props.dispatch(actions.sendMessage(this.props.params.chatid, this.props.params.participantid, message))
  }

  _exitGroup(){
    this.props.dispatch(actions.exitGroup(this.props.params.chatid, this.props.params.participantid))    
  }
}

let mapStateToProps = state => {
  return {
    loadingChatInfo: state.chatReducers.loadingChatInfo,
    loadingChat: state.chatReducers.loadingChat,
    addingParticipant: state.chatReducers.addingParticipant,
    errorLoadingChat: state.chatReducers.errorLoadingChat,
    errorAddingParticipant: state.chatReducers.errorAddingParticipant,
    participant: state.chatReducers.participant,
    chat: state.chatReducers.chat,
    chatPageUrl: state.chatReducers.chatPageUrl,
    reloadPage: state.chatReducers.reloadPage,
    messages: state.chatReducers.messages,
    sendingMessage: state.chatReducers.sendingMessage,
    errorSendingMessage: state.chatReducers.errorSendingMessage,
    goToHome: state.chatReducers.goToHome
  }
}

export default connect(mapStateToProps)(Chat)
