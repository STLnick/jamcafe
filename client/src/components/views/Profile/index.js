import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import api from 'api'

import './Profile.scss'

const repo = api()

export const Profile = () => {
  const location = useLocation()
  const [profile, setProfile] = useState(null)
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    (async () => {
      const profileRes = await repo.getUserByUsername(location.pathname.slice(9))
      setProfile(() => profileRes)
    })()
  }, [location.pathname])

  useEffect(() => {
    (async () => {
      console.log('Profile: ', profile)
      if (profile) {
        setUserPosts(await repo.getUserPosts(profile.uid))
      }
    })()
  }, [profile])

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
    .map(({ content, datePosted, title }) => (<div className="profile-post">
      <h4 className="post--title is-size-4">{title}</h4>
      <p className="is-size-5">{content}</p>
      <p className="post--date">{datePosted.slice(0, 10)}</p>
    </div>))

  return <main
    className="view-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">View Profile</h3>
    {profile
      ? <>
        <div className="profile-container flex flex--column flex--align-center flex--justify-around">
          <h4 id="name" className="profile-title">{profile.username}</h4>
          <img alt="User avatar" className="avatar" src={profile.avatar || 'img/avatar.jpg'} />
          <h6 className="profile-field-heading">Bio</h6>
          <p id="bio" className="profile-field">{profile.bio}</p>
          <h6 className="profile-field-heading">Location</h6>
          <p id="location" className="profile-field">{profile.location ? profile.location : ''}</p>
          <h6 className="profile-field-heading">Genres</h6>
          <p id="genres" className="profile-field">{profile.genres ? profile.genres.join(', ') : ''}</p>
          <h6 className="profile-field-heading">Instruments</h6>
          <div id="instruments">{profile.instruments ? renderInstrumentIcons() : ''}</div>
        </div>
        <Link
          className="cta-btn mt-6"
          to={`/message?${profile.username}`}>
          Send A Message
        </Link>
        <h3 className="section-heading profile-posts-heading">Posts By {profile.username}</h3>
        <div className="profile-posts-container">
          {userPosts ? renderUserPosts() : null}
        </div>
      </>
      : <h3>Loading...</h3>}
  </main>
}
