import { AnimatePresence } from 'framer-motion'
import React, { useMemo, useState } from 'react';
import {
  Route,
  Switch,
  useLocation
} from 'react-router-dom'

// base components
import { Footer, Header } from './components'
// views
import {
  About,
  Admin,
  Chat,
  CreatePost,
  EditProfile,
  Feed,
  Forgot,
  Home,
  Login,
  NotFound,
  Profile,
  Register
} from './components'
import { UserContext } from './UserContext'

import './App.scss';

export const App = () => {
  const location = useLocation()
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



  return (<>
    <div className="overlay" onClick={toggleMobileMenu}></div>
    <UserContext.Provider value={providerValue}>
      <Header
        handleClick={toggleMobileMenu}
        handleKeyDown={handleMenuBtnKeyDown}
      />
      <AnimatePresence>
        <Switch location={location} key={location.key}>
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
            <Feed />
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
          <Route exact path='/chat'>
            <Chat />
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
      </AnimatePresence>
    </UserContext.Provider>
    <Footer />
  </>
  );
}
