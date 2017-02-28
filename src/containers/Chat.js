import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css';
import HeaderChat from '../components/headerChat/HeaderChat'
import Footer from '../components/common/footer/Footer'
import Send from '../images/Send'

class Chat extends Component {
  constructor(props) {
    super(props);

    // this._renderWaiting = this._renderWaiting.bind(this)
  }

  componentWillMount(){
    
  }

  render() {
    return (
      <div className='Chat column'>
        <HeaderChat chatid={this.props.params.chatid} />
        <div className='chat-board row'>
          <div className='container member-list'>

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
              <button className='send-msg-btn'><Send innerColor='white' className='send-icon'/></button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // _renderWaiting() {
  //   if (this.props.showLoading) {
  //     return (
  //       <ActivityIndicator title={this.props.loadingTitle} />
  //     );
  //   } else {
  //     return null;
  //   }
  // }
}

let mapStateToProps = state => {
  return {
    // loadingTitle: state.homeReducers.loadingTitle
  }
}

export default connect(mapStateToProps)(Chat)
