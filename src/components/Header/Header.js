import React from 'react'
import './Header.scss'
import { Link } from 'react-router'

export const Header = () => (
  <div className='header-container'>
    <h4><Link className='home-link' id='Home' to='/'>KMX疑难杂症 💉</Link>
      <span className='header-right'>Beta 0.1</span>
    </h4>
  </div>
)

export default Header
