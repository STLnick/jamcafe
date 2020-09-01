import { About } from './pages/About'
import { Feed } from './pages/Feed'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

export default [
  {
    Component: About,
    path: '/about'
  },
  {
    Component: Home,
    path: '/'
  },
  {
    Component: Login,
    path: '/login'
  },
  {
    Component: Register,
    path: '/register'
  },
  {
    Component: Feed,
    path: '/feed'
  }
]
// TODO: About, Home, Login, Register are Pages for NOT LOGGED IN
// TODO: Feed, EditProfile, ViewProfile, Message, and WritePost etc. are Pages for LOGGED IN
