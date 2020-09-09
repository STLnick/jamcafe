import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import api from 'api'
import utils from 'utils'
import { UserContext } from 'UserContext'

import './EditProfile.scss'

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
  }, [location.pathname])

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

    const fd = new FormData()
    fd.append('file', document.querySelector('#avatar').files[0])
    fd.append('upload_preset', 'jamcafe')

    const res = await fetch('https://api.cloudinary.com/v1_1/stlnick/upload', {
      method: 'POST',
      body: fd
    })

    const { secure_url } = await res.json()

    updatedUserInfo.avatar = secure_url

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
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="rock">
            Rock
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Rock')} name="rock" id="rock" value="Rock" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="blues">
            Blues
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Blues')} name="blues" id="blues" value="Blues" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="metal">
            Metal
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Metal')} name="metal" id="metal" value="Metal" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="classicRock">
            Classic Rock
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Classic Rock')} name="classicRock" id="classicRock" value="Classic Rock" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="country">
            Country
            <input type="checkbox" defaultChecked={profileToEdit.genres?.includes('Country')} name="country" id="country" value="Country" />
            <span className="checkmark"></span>
          </label>
        </div>
        <h3 className="is-size-4 has-text-weight-bold">Instruments</h3>
        <div className="instruments flex flex--wrap flex--justify-center">
          {/* TODO: Create a renderGenres & renderInstruments fxn */}
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="guitar">
            Guitar
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Guitar')} name="guitar" id="guitar" value="Guitar" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="bass">
            Bass
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Bass')} name="bass" id="bass" value="Bass" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="drums">
            Drums
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Drums')} name="drums" id="drums" value="Drums" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="vocals">
            Vocals
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Vocals')} name="vocals" id="vocals" value="Vocals" />
            <span className="checkmark"></span>
          </label>
          <label className="checkbox-container flex flex--align-center is-size-4" htmlFor="keys">
            Keyboard / Piano
            <input type="checkbox" defaultChecked={profileToEdit.instruments?.includes('Keyboard / Piano')} name="keys" id="keys" value="Keyboard / Piano" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div class="file">
          <label class="file-label" htmlFor="avatar">
            <input class="file-input" type="file" name="avatar" id="avatar" />
            <span class="file-cta">
              <span class="file-icon">
                {/* TODO: ADD an icon to the upload button */}
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
            {/* TODO: place chosen file name inside this span */}
            <span class="file-name">
              Screen Shot 2017-07-29 at 15.54.25.png
            </span>
          </label>
        </div>
        <Link to={`/profile/${user.username}`} className="cancel-btn">Cancel</Link>
        <button className="cta-btn" type="submit">Confirm</button>
      </form>
      : <h3>Loading...</h3>}
  </main>)
}
