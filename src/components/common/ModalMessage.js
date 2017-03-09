import React, { Component } from 'react'

export default class ModalMessage extends Component {
  constructor(props) {
    super(props)

    this._return = this._return.bind(this)
  }

  render() {
    return (
      <div className='modal'>
        <div className='container column optionModal'>
          <div className='container column inputModal'>
            <span className='input'>{this.props.message}</span>
            <button
              type='button'
              className='button'
              onClick={this._return}>Ok</button>
          </div>
        </div>
      </div>
    )
  }

  _return(e) {
    e.preventDefault()
    this.props.onClick()
  }
}
