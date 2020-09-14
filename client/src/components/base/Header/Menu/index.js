import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import auth from 'auth'
import { UserContext } from 'UserContext'

import './Menu.scss'

export const Menu = () => {

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
      className="menu--list-link"
      to={path}
    >
      {text}
    </Link>
  </li>))

  return (
    <div className="menu">
      <ul className="menu--list flex flex--align-center flex--justify-between">
        {renderLinks()}
        {user?.admin
          ? <li>
            <Link
              className="menu--list-link"
              to='/admin'
            >
              Admin Dashboard
            </Link>
          </li>
          : null}
        {user
          ? <button
            className="cancel-btn is-size-5 is-uppercase"
            onClick={handleSignOut}>
            Sign out
          </button>
          : <>
            <Link
              className="menu--list-link link-button"
              to='/register'
            >
              <button
                className="cancel-btn is-uppercase"
              >
                Sign Up
            </button>
            </Link>
            <Link
              className="menu--list-link link-button"
              to='/login'
            >
              <button
                className="cta-btn is-uppercase"
              >
                Login
            </button>
            </Link>
          </>}
      </ul>
    </div>
  )
}
