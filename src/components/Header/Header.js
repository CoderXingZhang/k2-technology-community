import React from 'react'
import './Header.scss'
import { Link } from 'react-router'

export const Header = () => (
  <div className='header-container'>
    <h4><Link className='home-link' id='Home' to='/'>知识库</Link></h4>
  </div>
)

export default Header
