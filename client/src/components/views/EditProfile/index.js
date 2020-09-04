import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import api from 'api'
import utils from 'utils'
import { UserContext } from 'UserContext'

const repo = api()

export const EditProfile = () => {
  const history = useHistory()
  const location = useLocation()
  const [editError, setEditError] = useState('')
  const [profileToEdit, setProfileToEdit] = useState(null)
  const { user, setUser } = useContext(UserContext)

  if (!user) {
    history.push('/login')
  }

  useEffect(() => {
    (async () => {
      const profileRes = await repo.getUserByUsername(location.pathname.slice(14))
      setProfileToEdit(profileRes)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const editedUserInfo = utils.createObjectFromFields(e.target.elements)

    const combineUserInfo = () => {
      let updatedInfo = { ...profileToEdit, ...editedUserInfo }
      updatedInfo.genres = editedUserInfo.genres || []
      updatedInfo.instruments = editedUserInfo.instruments || []
      return updatedInfo
    }

    const updatedUserInfo = combineUserInfo()

    try {
      // Make PATCH request to server to update user
      await repo.updateUser(updatedUserInfo)
      // Update the user context name if successful
      setUser(prevUser => ({ ...prevUser, name: updatedUserInfo.name }))
      // Reset Error message
      setEditError('')
      // Redirect user to their own profile view (not editing) if successful
      history.push(`/profile/${user.username}`)
    } catch (err) {
      setEditError(err.message)
    }
  }

  return (<main className="edit-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 className="section-heading">Edit Profile</h3>
    {editError ? <p className="help has-text-danger is-size-3">{editError}</p> : null}
    {profileToEdit
      ? <form
        className="edit-profile-form flex flex--column flex--align-center flex--justify-around"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="name" className="screen-reader-text">Name</label>
        <input
          id="name"
          type="text"
          className="my-input"
          placeholder="Name"
          defaultValue={profileToEdit.name}
        />
        <label htmlFor="bio" className="screen-reader-text">About Me</label>
        <textarea
          id="bio"
          className="my-input"
          defaultValue={profileToEdit.bio ? profileToEdit.bio : ''}
          placeholder="About Me"></textarea>
        <label htmlFor="location" className="screen-reader-text">Location</label>
        <input
          id="location"
          type="text"
          className="my-input"
          placeholder="Location (St Louis, MO)"
          defaultValue={profileToEdit.location ? profileToEdit.location : ''}
        />
        <h3 className="is-size-4 has-text-weight-bold">Genres</h3>
        <div className="genres flex flex--wrap flex--justify-center">
          <label className="flex flex--align-center is-size-4" htmlFor="rock">
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Rock')} name="rock" id="rock" value="Rock" />
            Rock
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="blues">
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Blues')} name="blues" id="blues" value="Blues" />
            Blues
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="metal">
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Metal')} name="metal" id="metal" value="Metal" />
            Metal
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="classicRock">
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Classic Rock')} name="classicRock" id="classicRock" value="Classic Rock" />
            Classic Rock
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="country">
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Country')} name="country" id="country" value="Country" />
            Country
          </label>
        </div>
        {/* <label className="is-size-4" htmlFor="genres" className="screen-reader-text">Genres</label>
        <input
          id="genres"
          type="text"
          className="my-input"
          placeholder="Genres you play (Rock, Blues, Metal)"
          defaultValue={profileToEdit.genres ? profileToEdit.genres.join(', ') : ''}
        /> */}
        <h3 className="is-size-4 has-text-weight-bold">Instruments</h3>
        <div className="instruments flex flex--wrap flex--justify-center">
          {/* TODO: Create a renderGenres & renderInstruments fxn */}
          <label className="flex flex--align-center is-size-4" htmlFor="guitar">
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Guitar')} name="guitar" id="guitar" value="Guitar" />
            Guitar
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="bass">
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Bass')} name="bass" id="bass" value="Bass" />
            Bass
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="drums">
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Drums')} name="drums" id="drums" value="Drums" />
            Drums
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="vocals">
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Vocals')} name="vocals" id="vocals" value="Vocals" />
            Vocals
          </label>
          <label className="flex flex--align-center is-size-4" htmlFor="keys">
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Keyboard / Piano')} name="keys" id="keys" value="Keyboard / Piano" />
            Keyboard / Piano
          </label>
        </div>
        {/* <label htmlFor="instruments" className="screen-reader-text">Instruments</label>
        <input
          id="instruments"
          type="text"
          className="my-input"
          placeholder="Instruments (Guitar, Bass, Drums)"
          defaultValue={profileToEdit.instruments ? profileToEdit.instruments.join(', ') : ''}
        /> */}
        {/* TODO: Implement cancel logic: clear fields? reset to original values? redirect to view profile? */}
        <button className="cancel-btn">Cancel</button>
        <button className="cta-btn" type="submit">Confirm</button>
      </form>
      : <h3>Loading...</h3>}
  </main>)
}
