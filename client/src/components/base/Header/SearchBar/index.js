import React from 'react'

export const SearchBar = () => {
  return (<div className="search-bar flex">
    <form action="" className="search-form flex flex--align-center flex--justify-between">
      <input type="text" className="search-input" placeholder="Search..." />
      {/* <!-- TODO: Configure Submit to only display Posts matching Search Text --> */}
      {/* <!-- TODO: Could maybe just have it dynamically filter and not have to press btn --> */}
      <button type="submit" className="search-button flex flex--align-center">
        <img src="img/icons/search-circle-sharp.svg" className="search-icon filter-primary" alt="Search icon" />
      </button>
    </form>
  </div>)
}
