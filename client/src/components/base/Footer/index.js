import React from 'react'

export const Footer = () => {

  return (
    <footer className="footer flex flex--align-center flex--justify-between">
      <div className="logo-container">
        <img className="logo" src="img/logo.svg" alt="Jam Cafe logo" />
      </div>
      <div className="social-links flex flex--justify-evenly">
        <a href="#">
          <img src="img/icons/logo-instagram.svg" className="filter-primary social-icon" alt="Instagram Logo" />
        </a>
        <a href="#">
          <img src="img/icons/logo-facebook.svg" className="filter-primary social-icon" alt="Facebook Logo" />
        </a>
        <a href="#">
          <img src="img/icons/logo-twitter.svg" className="filter-primary social-icon" alt="Twitter logo" />
        </a>
      </div>
    </footer>
  )
}
