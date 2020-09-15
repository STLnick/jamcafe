import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Menu } from './Menu'
import { MobileMenu } from './MobileMenu'

import './Header.scss'
import { ReactComponent as MenuIcon } from '../../../assets/menu.svg'

export const Header = ({ handleClick, handleKeyDown }) => {
  return (
    <header className="top-nav flex flex--justify-between flex--align-center">
      <div className="logo-container">
        <Link to='/'>
          <img className="logo" src="img/logo.svg" alt="Jam Cafe logo" />
        </Link>
      </div>
      <div className="top-nav-right flex flex--justify-around">
        <button
          className="menu-btn-container"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <MenuIcon className="menu-btn filter-primary" />
        </button>
      </div>
      <MobileMenu handleClick={handleClick} />
      <Menu />
    </header>
  )
}

Header.propTypes = {
  handleClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
  handleSearchSelectionChange: PropTypes.func,
  handleSearchTextChange: PropTypes.func,
  searchSelection: PropTypes.string,
  searchText: PropTypes.string
}
