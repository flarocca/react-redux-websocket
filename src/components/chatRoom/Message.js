import React, { Component } from 'react'
import moment from 'moment'

export default class Message extends Component {
  render() {
    return (
      <li key={this.props.timestamp}>
        <div className={'msg-container ' + this.props.className}>
          <span className='msg-name'>
            {this.props.name}
            <span className='msg-timestamp'>{'  (' + moment(this.props.timestamp).format('hh:mm') + ')'}</span>
          </span>
          <span className='msg-message'>{this.props.message}</span>
        </div>
      </li>
    )
  }
}
