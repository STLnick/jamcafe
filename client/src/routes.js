import { About, Feed, Home, Login, Register } from './components'

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
