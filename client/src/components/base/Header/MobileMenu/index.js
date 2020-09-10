import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import auth from 'auth'
import { UserContext } from 'UserContext'

export const MobileMenu = ({ handleClick }) => {
  const history = useHistory()
  const { user, setUser } = useContext(UserContext)

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
      },
      {
        path: '/message',
        text: 'TESTING MSG'
      }
    ]

  const handleSignOut = async () => {
    await auth.signOut()
    setUser(() => null)
    history.push('/login')
  }

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
        {user?.admin
          ? <li>
            <Link
              className="mobile-menu--list-link"
              onClick={handleClick}
              to='/admin'
            >
              Admin Dashboard
            </Link>
          </li>
          : null}
        {user
          ? <button
            className="button mt-5 is-size-5 is-uppercase"
            onClick={handleSignOut}>
            Sign out
          </button>
          : null}
      </ul>
    </div>
  )
}

MobileMenu.propTypes = {
  handleClick: PropTypes.func
}
