import { About, EditProfile, Feed, Forgot, Home, Login, Profile, Register } from './components'

export default [
  {
    Component: About,
    path: '/about'
  },
  {
    Component: EditProfile,
    path: '/profile/edit' // Should only go to Editing Profile of the Logged In User
  },
  {
    Component: Forgot,
    path: '/forgot'
  },
  {
    Component: Feed,
    path: '/feed'
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
    Component: Profile,
    path: '/profile'
  },
  {
    Component: Register,
    path: '/register'
  }
]
// TODO: About, Home, Login, Register are Pages for NOT LOGGED IN
// TODO: Feed, EditProfile, ViewProfile, Message, and WritePost etc. are Pages for LOGGED IN
