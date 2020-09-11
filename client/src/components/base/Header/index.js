import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MobileMenu } from './MobileMenu'
import { SearchBar } from './SearchBar'
import { UserContext } from 'UserContext'

export const Header = ({ handleClick, handleKeyDown, handleSearchSelectionChange, handleSearchTextChange, searchSelection, searchText }) => {
  const location = useLocation()
  const { user } = useContext(UserContext)

  return (
    <header className="top-nav flex flex--justify-between flex--align-center">
      <div className="logo-container">
        <Link to='/'>
          <img className="logo" src="img/logo.svg" alt="Jam Cafe logo" />
        </Link>
      </div>
      {user && location.pathname === '/feed'
        ? <SearchBar
          handleSearchSelectionChange={handleSearchSelectionChange}
          handleSearchTextChange={handleSearchTextChange}
          searchSelection={searchSelection}
          searchText={searchText}
        />
        : null}
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
  handleKeyDown: PropTypes.func,
  handleSearchSelectionChange: PropTypes.func,
  handleSearchTextChange: PropTypes.func,
  searchSelection: PropTypes.string,
  searchText: PropTypes.string
}
