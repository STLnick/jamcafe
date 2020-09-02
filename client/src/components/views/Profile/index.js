import React from 'react'
import { useLocation } from 'react-router-dom'

export const Profile = () => {
  const location = useLocation()
  const user = location.state.userProp
  console.log(user)
  // TODO: Remove hard code and receive a USER prop and then display accordingly

  return (<main className="view-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">View Profile</h3>
    <div className="profile-container flex flex--column flex--align-center flex--justify-around">
      <h4 id="name" className="profile-title">{user.username}</h4>
      <h6 className="profile-field-heading">Bio</h6>
      <p id="bio" className="profile-field">{user.about}</p>
      <h6 className="profile-field-heading">Location</h6>
      <p id="location" className="profile-field">{user.location ? user.location : ''}</p>
      <h6 className="profile-field-heading">Genres</h6>
      <p id="genres" className="profile-field">{user.genres ? user.genres.join(', ') : ''}</p>
      <h6 className="profile-field-heading">Instruments</h6>
      <p id="instruments" className="profile-field">{user.instruments ? user.instruments.join(', ') : ''}</p>
    </div>
  </main>)
}
