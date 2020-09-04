import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import api from 'api'

const repo = api()

export const Profile = () => {
  const location = useLocation()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    (async () => {
      const profileRes = await repo.getUserByUsername(location.pathname.slice(9))
      setProfile(profileRes)
    })()
  }, [])

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
        <p id="genres" className="profile-field">{profile.genres ? profile.genres.join(', ') : ''}</p>
        <h6 className="profile-field-heading">Instruments</h6>
        <p id="instruments" className="profile-field">{profile.instruments ? profile.instruments.join(', ') : ''}</p>
      </div>
      : <h3>Loading...</h3>}

  </main>)
}
