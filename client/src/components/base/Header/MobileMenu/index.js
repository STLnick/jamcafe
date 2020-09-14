import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import auth from 'auth'
import { UserContext } from 'UserContext'

import './MobileMenu.scss'

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
        text: 'Create Post'
      },
      {
        path: `/profile/${user.username}`,
        text: 'Profile'
      },
      {
        path: `/profile/edit/${user.username}`,
        text: 'Edit Profile'
      }
    ]
    : [
      {
        path: '/',
        text: 'Home'
      },
      {
        path: '/about',
        text: 'About'
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
            className="cancel-btn small-btn mt-5 is-size-4 is-uppercase"
            onClick={handleSignOut}>
            Sign out
          </button>
          : <>
            <Link
              className="mobile-menu--list-link link-button"
              onClick={handleClick}
              to='/register'
            >
              <button
                className="cancel-btn small-btn mt-5 is-size-4 is-uppercase"
              >
                Sign Up
            </button>
            </Link>
            <Link
              className="mobile-menu--list-link link-button"
              onClick={handleClick}
              to='/login'
            >
              <button
                className="cta-btn small-btn mt-5 is-size-4 is-uppercase"
              >
                Login
            </button>
            </Link>
          </>}
      </ul>
    </div >
  )
}

MobileMenu.propTypes = {
  handleClick: PropTypes.func
}
