import React, { useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { Footer, Header } from './components'
import routes from './routes'
import { UserContext } from './UserContext'

import './App.scss';

export const App = () => {
  const [user, setUser] = useState(null)
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

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
      <div className="overlay" onClick={toggleMobileMenu}></div>
      <UserContext.Provider value={providerValue}>
        <Header handleClick={toggleMobileMenu} handleKeyDown={handleMenuBtnKeyDown} />
        {routes.map(({ Component, path }, i) => (
          <Route
            key={i}
            exact
            path={path}
            component={Component}
          />
        ))}
      </UserContext.Provider>
      <Footer />
    </Router>
  );
}
