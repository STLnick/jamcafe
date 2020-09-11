import React, { useState } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import './SearchBar.scss'
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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        content: {
          height: '275px',
          left: '50%',
          top: '25%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
        }
      }}
    >
      {/* Checkboxes for filter selection */}
      <form
        className="filter-modal-form flex flex--column flex--align-center flex--justify-between"
        onSubmit={(e) => {
          handleSearchSelectionChange(e)
          setModalIsOpen(false)
        }}
      >
        <label className="medium-label" htmlFor="filter-choice">Filter By</label>
        <div
          className="select is-medium is-primary flex flex--column flex--align-center flex--justify-center"
        >
          <select
            name="filter-choice"
            onChange={(e) => setSelectValue(e.target.value)}
            id="filter-choice"
            value={selectValue}
          >
            <option value="title">
              Title
            </option>
            <option value="username">
              Username
            </option>
          </select>
        </div>
        <div className="flex flex--column flex--align-center flex--justify-center">
          <button className="cancel-btn" onClick={() => setModalIsOpen(false)}>Cancel</button>
          <button className="cta-btn" type="submit">Confirm</button>
        </div>
      </form>
    </Modal>
  </div >)
}

SearchBar.propTypes = {
  handleSearchSelectionChange: PropTypes.func,
  handleSearchTextChange: PropTypes.func,
  searchSelection: PropTypes.string,
  searchText: PropTypes.string
}
