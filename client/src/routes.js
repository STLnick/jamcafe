import {
  About,
  CreatePost,
  EditProfile,
  Feed,
  Forgot,
  Home,
  Login,
  Message,
  Profile,
  Register
} from './components'

export default [
  {
    Component: About,
    path: '/about'
  },
  {
    Component: CreatePost,
    path: '/post'
  },
  {
    Component: EditProfile,
    path: '/profile/edit/:username'
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
    Component: Message,
    path: '/message'
  },
  {
    Component: Profile,
    path: '/profile/:username'
  },
  {
    Component: Register,
    path: '/register'
  }
]
