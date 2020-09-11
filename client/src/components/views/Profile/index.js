import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import api from 'api'
import { UserContext } from 'UserContext'

import './Profile.scss'
import { ReactComponent as EditIcon } from '../../../assets/pencil.svg'

const postsAPI = api('posts')
const usersAPI = api('users')

export const Profile = () => {
  const location = useLocation()
  const [isLoggedInUsersProfile, setIsLoggedInUsersProfile] = useState(false)
  const [profile, setProfile] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    (async () => {
      const profileRes = await usersAPI.showOne(location.pathname.slice(9))
      setProfile(() => profileRes)
    })()
  }, [location.pathname])

  useEffect(() => {
    (async () => {
      if (profile) {
        setUserPosts(await postsAPI.showOne(profile.username))
        setIsLoggedInUsersProfile(user?.username === profile.username)
      }
    })()
  }, [profile, user.username])

  const determineInstrumentIcon = (instrument) => {
    switch (instrument) {
      case 'Guitar':
        return '../img/icons/electric-guitar.svg'
      case 'Bass':
        return '../img/icons/bass-guitar.svg'
      case 'Drums':
        return '../img/icons/snare-drum.svg'
      case 'Vocals':
        return '../img/icons/microphone.svg'
      case 'Keyboard / Piano':
        return '../img/icons/piano.svg'
      default:
        return '../img/icons/note.svg'
    }
  }

  const renderInstrumentIcons = () => profile.instruments.map(instrument => {
    return <img key={instrument} className="instrument-icon-lg" src={determineInstrumentIcon(instrument)} alt={`${instrument} icon`} />
  })

  const renderUserPosts = () => userPosts.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    .map(({ content, datePosted, title }, i) => (<div className="profile-post" key={i}>
      <h4 className="post--title is-size-4">{title}</h4>
      <p className="is-size-5">{content}</p>
      <p className="post--date">{datePosted.slice(0, 10)}</p>
      {isLoggedInUsersProfile
        ? <button className="cancel-btn small-btn mt-4 flex flex--align-center">
          {/* <img className="filter-primary" src="img/icons/pencil.svg" alt="Edit icon" /> */}
          <EditIcon className="filter-primary small-icon" />
          Edit Post
        </button>
        : null}
    </div>))

  return <main
    className="view-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">View Profile</h3>
    {profile
      ? <>
        <div className="profile-container flex flex--column flex--align-center flex--justify-around">
          <h4 id="name" className="profile-title">{profile.username}</h4>
          <img alt="User avatar" className="avatar big" src={profile.avatar || 'img/avatar.jpg'} />
          <h6 className="profile-field-heading">Bio</h6>
          <p id="bio" className="profile-field">{profile.bio}</p>
          <h6 className="profile-field-heading">Location</h6>
          <p id="location" className="profile-field">{profile.location ? profile.location : ''}</p>
          <h6 className="profile-field-heading">Genres</h6>
          <p id="genres" className="profile-field">{profile.genres ? profile.genres.join(', ') : ''}</p>
          <h6 className="profile-field-heading">Instruments</h6>
          <div id="instruments">{profile.instruments ? renderInstrumentIcons() : ''}</div>
        </div>
        {isLoggedInUsersProfile
          ? <Link
            className="cancel-btn mt-6"
            to={`/profile/edit/${user.username}`}>
            Edit Profile
        </Link>
          : <Link
            className="cta-btn mt-6"
            to={`/message?${profile.username}`}>
            Send A Message
        </Link>}
        <h3 className="section-heading profile-posts-heading">Posts By {profile.username}</h3>
        <div className="profile-posts-container">
          {userPosts ? renderUserPosts() : null}
        </div>
      </>
      : <h3>Loading...</h3>}
  </main>
}
