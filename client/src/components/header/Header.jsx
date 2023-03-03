import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Header.css'

const Header = () => {
  return (
    <div className='main-header'>
      <div>
      <Link to="/">Password Manager</Link>
      </div>
      <div>
        <Link to="/register">Signup</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Header