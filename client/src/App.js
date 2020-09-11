import React, { useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// components
import { Footer, Header } from './components'
// views
import {
  About,
  Admin,
  CreatePost,
  EditProfile,
  Feed,
  Forgot,
  Home,
  Login,
  Message,
  NotFound,
  Profile,
  Register
} from './components'
import { UserContext } from './UserContext'

import './App.scss';

export const App = () => {
  const [searchSelection, setSearchSelection] = useState('title')
  const [searchText, setSearchText] = useState('')
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

  const handleSearchSelectionChange = (e) => {
    e.preventDefault()
    setSearchSelection(e.target.elements[0].value)
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <Router>
      <div className="overlay" onClick={toggleMobileMenu}></div>
      <UserContext.Provider value={providerValue}>
        <Header
          handleClick={toggleMobileMenu}
          handleKeyDown={handleMenuBtnKeyDown}
          handleSearchSelectionChange={handleSearchSelectionChange}
          handleSearchTextChange={handleSearchTextChange}
          searchSelection={searchSelection}
          searchText={searchText} />
        <Switch>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/admin'>
            <Admin />
          </Route>
          <Route exact path='/post'>
            <CreatePost />
          </Route>
          <Route exact path='/profile/edit/:username'>
            <EditProfile />
          </Route>
          <Route exact path='/feed'>
            <Feed searchSelection={searchSelection} searchText={searchText} />
          </Route>
          <Route exact path='/forgot'>
            <Forgot />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/message'>
            <Message />
          </Route>
          <Route exact path='/profile/:username'>
            <Profile />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </UserContext.Provider>
      <Footer />
    </Router>
  );
}
