import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css';
import Header from '../components/header/Header'
import Body from './Body'
import ActivityIndicator from '../components/common/ActivityIndicator'

class App extends Component {
  constructor (props) {
    super(props)

    this._renderWaiting = this._renderWaiting.bind(this)
  }

  render () {
    return (
      <div className='App column'>
        <Header backgroundColor='rgb(91, 164, 215)' />
        <Body />
        {this._renderWaiting()}
      </div>
    )
  }

  _renderWaiting () {
    if (this.props.showLoading) {
      return (
        <ActivityIndicator title={this.props.loadingTitle} />
      )
    } else {
      return null
    }
  }
}

let mapStateToProps = state => {
  return {
    showLoading: state.homeReducers.showLoading,
    loadingTitle: state.homeReducers.loadingTitle
  }
}

export default connect(mapStateToProps)(App)
