import React from 'react'
import { useLocation } from 'react-router-dom'
import utils from 'utils'

export const EditProfile = () => {
  const location = useLocation()
  const user = location.state.userProp

  const handleSubmit = async (e) => {
    e.preventDefault()

    const editedUserInfo = utils.createObjectFromFields(e.target.elements)
    const updatedUserInfo = { ...user, ...updatedUserInfo }
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

  return (<main class="edit-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 class="section-heading">Edit Profile</h3>
    <form
      class="edit-profile-form flex flex--column flex--align-center flex--justify-around"
      onSubmit={() => handleSubmit()}
    >
      <label for="name" class="screen-reader-text">Name</label>
      <input
        id="name"
        type="text"
        class="my-input"
        placeholder="Name"
        value={user.name}
      />
      <label for="bio" class="screen-reader-text">About Me</label>
      <textarea id="bio" class="my-input" placeholder="About Me">
        {user.about ? user.about : ''}
      </textarea>
      <label for="location" class="screen-reader-text">Location</label>
      <input
        id="location"
        type="text"
        class="my-input"
        placeholder="Location (St Louis, MO)"
        value={user.location ? user.location : ''}
      />
      <label for="genres" class="screen-reader-text">Genres</label>
      <input
        id="genres"
        type="text"
        class="my-input"
        placeholder="Genres you play (Rock, Blues, Metal)"
        value={user.genres ? user.genres.join(', ') : ''}
      />
      <label for="instruments" class="screen-reader-text">Instruments</label>
      <input
        id="instruments"
        type="text"
        class="my-input"
        placeholder="Instruments (Guitar, Bass, Drums)"
        value={user.instruments ? user.instruments.join(', ') : ''}
      />
      {/* TODO: Implement cancel logic: clear fields? reset to original values? rediret to view profile? */}
      <button class="cancel-btn">Cancel</button>
      <button class="cta-btn" type="submit">Confirm</button>
    </form>
  </main>)
}
