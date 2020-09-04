import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { UserContext } from 'UserContext'

export const MobileMenu = ({ handleClick }) => {
  const { user } = useContext(UserContext)

  const links = user
    ? [
      {
        path: '/feed',
        text: 'Post Feed'
      },
      {
        path: '/post',
        text: 'Create A Post'
      },
      {
        path: `/profile/${user.username}`,
        text: 'Profile'
      },
      {
        path: `/profile/edit/${user.username}`,
        text: 'Edit Profile'
      },
      {
        path: '/about',
        text: 'About'
      }
    ]
    : [
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

  const renderLinks = () => links.map(({ path, text }, i) => (<li key={i}>
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
