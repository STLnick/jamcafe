import React, { useState } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import { ReactComponent as FunnelIcon } from '../../../../assets/funnel.svg'

export const SearchBar = ({ handleSearchSelectionChange, handleSearchTextChange, searchSelection, searchText }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectValue, setSelectValue] = useState(searchSelection)

  return (<div className="search-bar flex flex--align-center flex--justify-between">
    <input
      type="text"
      className="search-input"
      onChange={(e) => handleSearchTextChange(e)}
      placeholder={searchSelection === 'title' ? 'Search Posts by Title' : 'Search Posts by User'}
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
      <form onSubmit={(e) => {
        handleSearchSelectionChange(e)
        setModalIsOpen(false)
      }}>
        <label htmlFor="filter-choice"></label>
        <select
          name="filter-choice"
          onChange={(e) => setSelectValue(e.target.value)}
          id="filter-choice"
          value={selectValue}>
          <option value="title">
            Title
          </option>
          <option value="username">
            Username
          </option>
        </select>

        {/* <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="title">
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
        </label> */}
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
