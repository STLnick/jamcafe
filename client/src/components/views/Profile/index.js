import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const Profile = () => {
  // TODO: Only show the edit profile button if this is the profile of
  // TODO: the currently logged in user
  const history = useHistory()
  const location = useLocation()
  const user = location.state.userProp

  const handleEditProfileClick = () => {
    // TODO: Change this to not just send in the user but to use the
    // TODO: UserContext value that I should create using the
    // TODO: usecontext() hook
    history.push(`/profile/edit`, { userProp: user })
  }

  return (<main className="view-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">View Profile</h3>
    {/* TEMPORARY BUTTON TO TEST EDIT PROFILE VIEW BY SENDING USER OBJ AS PROP */}
    <button onClick={() => handleEditProfileClick()}>Edit Profile</button>
    <div className="profile-container flex flex--column flex--align-center flex--justify-around">
      <h4 id="name" className="profile-title">{user.username}</h4>
      <h6 className="profile-field-heading">Bio</h6>
      <p id="bio" className="profile-field">{user.bio}</p>
      <h6 className="profile-field-heading">Location</h6>
      <p id="location" className="profile-field">{user.location ? user.location : ''}</p>
      <h6 className="profile-field-heading">Genres</h6>
      <p id="genres" className="profile-field">{user.genres ? user.genres.join(', ') : ''}</p>
      <h6 className="profile-field-heading">Instruments</h6>
      <p id="instruments" className="profile-field">{user.instruments ? user.instruments.join(', ') : ''}</p>
    </div>
  </main>)
}
