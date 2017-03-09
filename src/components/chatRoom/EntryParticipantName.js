import React, { Component } from 'react'

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

export default class EntryParticipantName extends Component {
  constructor(props) {
    super(props)

    this._nameCompleted = this._nameCompleted.bind(this)
  }

  render() {
    return (
      <div className='modal'>
        <div className='container column optionModal'>
          <div className='container column inputModal'>
            <input
              type='text'
              id='name'
              className='input'
              style={this.props.showError ? BORDER_STYLE_RED : BORDER_STYLE_NORMAL}
              placeholder={this.props.placeholder}
              ref='enterName' />
            <button
              type='button'
              className='button'
              onClick={this._nameCompleted}>Ok</button>
          </div>
        </div>
      </div>
    )
  }

  _nameCompleted(e) {
    e.preventDefault()
    this.props.onClick(this.refs.enterName.value)
  }
}
