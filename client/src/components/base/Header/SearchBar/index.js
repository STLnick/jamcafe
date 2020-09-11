import React, { useState } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { ReactComponent as FunnelIcon } from '../../../../assets/funnel.svg'

export const SearchBar = ({ handleSearchSelectionChange, handleSearchTextChange, searchSelection, searchText }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (<div className="search-bar flex flex--align-center flex--justify-between">
    <input
      type="text"
      className="search-input"
      onChange={(e) => handleSearchTextChange(e)}
      placeholder="Search Posts By Title"
      value={searchText}
    />
    <button
      className="search-button flex flex--align-center"
      onClick={() => setModalIsOpen(true)}
    >
      <FunnelIcon className="filter-primary search-icon" />
    </button>
    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      {/* Checkboxes for filter selection */}
      <form onSubmit={(e) => handleSearchSelectionChange(e)}>
        <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="title">
          Title
        <input
            defaultChecked={searchSelection === 'title'}
            id="title"
            name="title"
            type="checkbox"
            value="title"
          />
          <span className="checkmark"></span>
        </label>
        <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="username">
          Username
        <input
            defaultChecked={searchSelection === 'username'}
            id="username"
            name="username"
            type="checkbox"
            value="username"
          />
          <span className="checkmark"></span>
        </label>
        <button className="cancel-btn" onClick={() => setModalIsOpen(false)}>Cancel</button>
        <button className="cta-btn" type="submit">Confirm</button>
      </form>
    </Modal>
  </div>)
}

SearchBar.propTypes = {
  handleSearchSelectionChange: PropTypes.func,
  handleSearchTextChange: PropTypes.func,
  searchSelection: PropTypes.string,
  searchText: PropTypes.string
}
