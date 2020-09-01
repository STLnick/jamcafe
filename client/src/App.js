import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { Footer, Header } from './components'
import routes from './routes'

import './App.scss';

export const App = () => {

  const toggleMobileMenu = () => {
    document.querySelector('.mobile-menu').classList.toggle('active-mobile-menu')
    document.querySelector('.overlay').classList.toggle('enabled')
  }

  const handleMenuBtnKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      toggleMobileMenu()
    }
  }

  return (
    <Router>
      {/* onClick on div only there to close menu if overlay is present */}
      <div className="overlay" onClick={toggleMobileMenu}></div>
      <Header handleClick={toggleMobileMenu} handleKeyDown={handleMenuBtnKeyDown} />
      {routes.map(({ Component, path }, i) => (
        <Route
          key={i}
          exact
          path={path}
          component={Component}
        />
      ))}
      <Footer />
    </Router>
  );
}
