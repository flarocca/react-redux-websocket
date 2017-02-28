import React, { Component } from 'react'
import GitHub from './GitHub'
import LinkedIn from './LinkedIn'
import StackOverflow from './StackOverflow'
import REACT from './react-logo.svg'
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div className='container row footer'>
        <div className='container row full-width jc-center'>
          <p className='footer-text'>
            Copyright &copy; 2017 Facundo La Rocca. All right reserved.
            Made with <i><a href={'https://facebook.github.io/react/'} className='footer-text'>ReactJS.</a></i>
            <a href={'https://facebook.github.io/react/'}><img src={REACT} className='logo' alt='ReactJs' /></a>
          </p>
          <a target='_blank' className='container column jc-center' href={'http://stackoverflow.com/users/4585153/facundo-la-rocca?tab=profile'}><StackOverflow className='icon-med' innerColor='white' outerColor='transparent' /></a>
          <a target='_blank' className='container column jc-center' href={'https://www.linkedin.com/in/facundo-la-rocca-5803673b/'}><LinkedIn className='icon-large' innerColor='white' outerColor='transparent' /></a>
          <a target='_blank' className='container column jc-center' href={'https://github.com/flarocca'}><GitHub className='icon' innerColor='white' /></a>
        </div>
      </div>
    )
  }
}
