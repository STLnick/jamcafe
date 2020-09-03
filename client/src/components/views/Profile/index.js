import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const Profile = () => {
  const history = useHistory()
  const location = useLocation()

  const isLoggedInUsersProfile = location.state.userProp.username === location.state.userLoggedIn?.username
  const currentlyViewedUser = isLoggedInUsersProfile
    ? location.state.userLoggedIn
    : location.state.userProp

  const handleEditProfileClick = () => {
    history.push(`/profile/edit`, { userProp: currentlyViewedUser })
  }

  return (<main className="view-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">View Profile</h3>
    {isLoggedInUsersProfile
      ? <button
        className="button is-danger is-outlined is-size-4 my-3"
        onClick={() => handleEditProfileClick()}
      >Edit Profile</button>
      : null}
    <div className="profile-container flex flex--column flex--align-center flex--justify-around">
      <h4 id="name" className="profile-title">{currentlyViewedUser.username}</h4>
      <h6 className="profile-field-heading">Bio</h6>
      <p id="bio" className="profile-field">{currentlyViewedUser.bio}</p>
      <h6 className="profile-field-heading">Location</h6>
      <p id="location" className="profile-field">{currentlyViewedUser.location ? currentlyViewedUser.location : ''}</p>
      <h6 className="profile-field-heading">Genres</h6>
      <p id="genres" className="profile-field">{currentlyViewedUser.genres ? currentlyViewedUser.genres.join(', ') : ''}</p>
      <h6 className="profile-field-heading">Instruments</h6>
      <p id="instruments" className="profile-field">{currentlyViewedUser.instruments ? currentlyViewedUser.instruments.join(', ') : ''}</p>
    </div>
  </main>)
}
