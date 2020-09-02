import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const MobileMenu = ({ handleClick }) => {

  const links = [
    {
      path: '/',
      text: 'Home'
    },
    {
      path: '/register',
      text: 'Sign Up'
    },
    {
      path: '/login',
      text: 'Login'
    },
    {
      path: '/about',
      text: 'About'
    }
  ]

  const renderLinks = () => links.map(({ path, text }) => (<li>
    <Link
      className="mobile-menu--list-link"
      onClick={handleClick}
      to={path}
    >
      {text}
    </Link>
  </li>))

  return (
    <div className="mobile-menu">
      <ul className="mobile-menu--list">
        {renderLinks()}
      </ul>
    </div>
  )
}

MobileMenu.propTypes = {
  handleClick: PropTypes.func
}
