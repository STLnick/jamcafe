import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const MobileMenu = ({ handleClick }) => {

  return (
    <div className="mobile-menu">
      <ul className="mobile-menu--list">
        <li>
          <Link
            onClick={handleClick}
            to='/'
          >Home
          </Link>
        </li>
        <li>
          <Link
            onClick={handleClick}
            to='/register'
          >Sign Up
          </Link>
        </li>
        <li>
          <Link
            onClick={handleClick}
            to='/login'
          >Login
          </Link>
        </li>
        <li>
          <Link
            onClick={handleClick}
            to='/about'
          >About
          </Link>
        </li>
      </ul>
    </div>
  )
}

MobileMenu.propTypes = {
  handleClick: PropTypes.func
}
