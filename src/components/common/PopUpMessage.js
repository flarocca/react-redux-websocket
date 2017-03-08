import React, { Component } from 'react'
import './PopUpMessage.css'

export default class PopUpMessage extends Component {
  constructor(props) {
    super(props)

    this._showMe = this._showMe.bind(this)

    this.state = {
      show: false,
      style: {
        backgroundColor: 'rgba(255, 81, 81, 0)',
        color: 'rgba(255, 255, 255, 0)',
      }
    }
  }

  componentDidMount() {
    this._showMe()
  }

  render() {
    return (
      <div className='popup-msg' style={this.state.style}>
        {this.props.message}
      </div>
    );
  }

  _showMe() {
    setTimeout(() => {
      this.setState({
        show: true,
        style: {
          backgroundColor: 'rgba(255, 81, 81, 1)',
          color: 'rgba(255, 255, 255, 1)'
        }
      }, () => {
        setTimeout(() => {
          this.setState({
            show: false,
            style: {
              backgroundColor: 'rgba(255, 81, 81, 0)',
              color: 'rgba(255, 255, 255, 0)'
            }
          }, () => {
            setTimeout(() => {
              this.setState({
                style: {
                  display: 'none'
                }
              })
            }, 1000);
          })
        }, this.props.time || 0)
      })
    }, 0)
  }
}
