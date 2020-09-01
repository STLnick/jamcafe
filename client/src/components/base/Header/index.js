import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MobileMenu } from './MobileMenu'

export const Header = ({ handleClick, handleKeyDown }) => {

  return (
    <header className="top-nav flex flex--justify-between flex--align-center">
      <div className="logo-container">
        <Link to='/'>
          <img className="logo" src="img/logo.svg" alt="Jam Cafe logo" />
        </Link>
      </div>
      {/* IF LOGGED IN - Display Search Bar */}
      <div className="top-nav-right flex flex--justify-around">
        <button
          className="menu-btn-container"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <img
            src="img/icons/menu.svg"
            alt="Menu button"
            className="menu-btn filter-primary"
          />
        </button>
      </div>
      <MobileMenu handleClick={handleClick} />
    </header>
  )
}

Header.propTypes = {
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func
}
