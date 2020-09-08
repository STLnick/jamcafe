import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import api from 'api'

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

  return (<main className="view-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">View Profile</h3>
    {profile
      ? <div className="profile-container flex flex--column flex--align-center flex--justify-around">
        <h4 id="name" className="profile-title">{profile.username}</h4>
        <h6 className="profile-field-heading">Bio</h6>
        <p id="bio" className="profile-field">{profile.bio}</p>
        <h6 className="profile-field-heading">Location</h6>
        <p id="location" className="profile-field">{profile.location ? profile.location : ''}</p>
        <h6 className="profile-field-heading">Genres</h6>
        {/* TODO: Refactor Genres/Instruments to be checkboxes? Could just display as string */}
        <p id="genres" className="profile-field">{profile.genres ? profile.genres.join(', ') : ''}</p>
        <h6 className="profile-field-heading">Instruments</h6>
        <div id="instruments">{profile.instruments ? renderInstrumentIcons() : ''}</div>
      </div>
      : <h3>Loading...</h3>}

  </main>)
}
