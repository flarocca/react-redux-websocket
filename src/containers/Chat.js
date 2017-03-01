import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css';
import HeaderChat from '../components/headerChat/HeaderChat'
import Footer from '../components/common/footer/Footer'
import Send from '../images/Send'
import * as actions from '../actions/index'
import ActivityIndicator from '../components/common/ActivityIndicator'

class Chat extends Component {
  constructor(props) {
    super(props);

    this._renderLoadingChat = this._renderLoadingChat.bind(this)
    this._renderParticipants = this._renderParticipants.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(actions.getChat())
    // this.props.dispatch(actions.openChatWebSocket())
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
            <div className='container message-list'>

            </div>
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
        <Footer />
      </div>
    );
  }

  _renderLoadingChat() {
    if (this.props.loadingChatInfo) {
      return (
        <ActivityIndicator title={'Loading chat info...'} />
      );
    } else {
      return null;
    }
  }

  _renderParticipants() {
    if (!this.props.loadingChatInfo && !this.props.errorLoadingChat && this.props.chat) {
      return (
        <ul>
          {this.props.chat.participants.map(function (participant) {
            return <li>{participant.name}</li>;
          })}
        </ul>
      );
    } else {
      return null;
    }
  }
}

let mapStateToProps = state => {
  return {
    loadingChatInfo: state.chatReducers.loadingChatInfo,
    errorLoadingChat: state.chatReducers.errorLoadingChat,
    chat: state.chatReducers.chat
  }
}

export default connect(mapStateToProps)(Chat)
