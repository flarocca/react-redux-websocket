import React, { Component } from 'react'
import Footer from '../components/common/footer/Footer'

export default class Root extends Component {
  render () {
    return (
      <div>
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
