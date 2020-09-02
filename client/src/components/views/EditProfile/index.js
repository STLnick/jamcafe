import React from 'react'
import { useLocation } from 'react-router-dom'
import utils from 'utils'

export const EditProfile = () => {
  const location = useLocation()
  const user = location.state.userProp

  const handleSubmit = async (e) => {
    e.preventDefault()

    const editedUserInfo = utils.createObjectFromFields(e.target.elements)
    const updatedUserInfo = { ...user, ...editedUserInfo }
    console.log(updatedUserInfo)

    // TODO: Make PATCH request to server to update user
    // const response = await repo.registerUser(userInfo)

    // Success if response is an object - Error if type is string
    // typeof response === 'object'
    //   ? setRegisterError('')
    //   // TODO: redirect the user to login?home?editProfile?
    //   // TODO: need to do something with the returned userObject?
    //   : setRegisterError(() => determineErrorMessage(response))


    // TODO: Redirect user to their own profile view (not editing) if successful
  }

  return (<main className="edit-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">Edit Profile</h3>
    <form
      className="edit-profile-form flex flex--column flex--align-center flex--justify-around"
      onSubmit={(e) => handleSubmit(e)}
    >
      <label htmlFor="name" className="screen-reader-text">Name</label>
      <input
        id="name"
        type="text"
        className="my-input"
        placeholder="Name"
        defaultValue={user.name}
      />
      <label htmlFor="bio" className="screen-reader-text">About Me</label>
      <textarea
        id="bio"
        className="my-input"
        defaultValue={user.bio ? user.bio : ''}
        placeholder="About Me"></textarea>
      <label htmlFor="location" className="screen-reader-text">Location</label>
      <input
        id="location"
        type="text"
        className="my-input"
        placeholder="Location (St Louis, MO)"
        defaultValue={user.location ? user.location : ''}
      />
      <label htmlFor="genres" className="screen-reader-text">Genres</label>
      <input
        id="genres"
        type="text"
        className="my-input"
        placeholder="Genres you play (Rock, Blues, Metal)"
        defaultValue={user.genres ? user.genres.join(', ') : ''}
      />
      <label htmlFor="instruments" className="screen-reader-text">Instruments</label>
      <input
        id="instruments"
        type="text"
        className="my-input"
        placeholder="Instruments (Guitar, Bass, Drums)"
        defaultValue={user.instruments ? user.instruments.join(', ') : ''}
      />
      {/* TODO: Implement cancel logic: clear fields? reset to original values? rediret to view profile? */}
      <button className="cancel-btn">Cancel</button>
      <button className="cta-btn" type="submit">Confirm</button>
    </form>
  </main>)
}
