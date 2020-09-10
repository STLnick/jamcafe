import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import api from 'api'
import firebaseApi from 'firebaseApi'
import { UserContext } from 'UserContext'

import './Admin.scss'

const postsAPI = api('posts')
const usersAPI = api('users')

// TODO: Add some way to identify a User as Admin, if they aren't redirect them away from this page
export const Admin = () => {
  const history = useHistory()
  const [error, setError] = useState('')
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [selectedView, setSelectedView] = useState('users')
  const { user } = useContext(UserContext)

  useEffect(() => {
    (async () => {
      if (user && user.admin) {
        setPosts(await postsAPI.show())
        setUsers(await usersAPI.show())
      } else if (user) {
        history.push('/feed')
      } else {
        history.push('/login')
      }
    })()
  }, [])

  const handleChangeViewClick = () => setSelectedView(prevView => prevView === 'users' ? 'posts' : 'users')

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    const adminEmail = e.target.elements[0].value.trim()
    console.log(adminEmail)
    const result = await firebaseApi.addAdminRole(adminEmail)
    console.log('Add Admin Role result: ', result)
  }

  // TODO: Add a way to manually Add a User or Post for the Admin
  // TODO: Will need to also manually add an email/password to Firebase
  const handleAddClick = async (e) => {
    console.log('Trying to ADD a new item!')
    try {
      if (selectedView === 'posts') {
        await postsAPI.addPost()
        setPosts(await postsAPI.show())
      } else {
        // TODO: Add logic to add a user... maybe...
        setUsers(await usersAPI.show())
      }
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDeleteClick = async (e) => {
    const id = e.target.closest('button').dataset.id // MongoDB identifier
    const uid = e.target.closest('button').dataset.uid // Firebase identifier

    try {
      if (selectedView === 'posts') {
        await postsAPI.delete({ _id: id })
        setPosts(await postsAPI.show())
      } else {
        await usersAPI.delete({ _id: id })
        setUsers(await usersAPI.show())
        const firebaseResult = await firebaseApi.deleteUser(uid)
        console.log(firebaseResult)
      }
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  // TODO: Add a way to manually Update a User or Post for the Admin
  // May need to develop a separate view to edit a specific item like /admin/edit?_id
  // then we can access all data there and send a PATCH to Mongo
  const handleEditClick = async (e) => {
    console.log('Attempting to EDIT this item!')
  }

  const renderTableHeadings = (resource) => Object.keys(resource[0]).map((key, i) => <td key={i}>{key}</td>).concat(<td key="blank"></td>)

  const renderTableBodyRows = (resource) => {
    const keys = Object.keys(resource[0])
    return resource.map((el, i) => <tr key={i}>
      {keys.map((key, i) => <td key={i}>{el[key]}</td>)
        .concat(<td key="edit">
          <button
            className="admin-icon"
            data-id={el._id}
            onClick={(e) => handleEditClick(e)}
          >
            <img className="filter-primary" alt="Edit icon" src="img/icons/pencil.svg" />
          </button>
        </td>)
        .concat(<td key="delete">
          <button
            className="admin-icon"
            data-id={el._id}
            data-uid={el.uid}
            onClick={(e) => handleDeleteClick(e)}
          >
            <img className="filter-primary" alt="Delete icon" src="img/icons/trash.svg" />
          </button>
        </td>)}
    </tr>)
  }

  return (<div className="admin-container flex flex--column flex--align-center">
    <h3 className="section-heading">Admin Dashboard</h3>
    <form onSubmit={(e) => handleAddAdmin(e)}>
      <label htmlFor="admin-email">Email to Make an Admin</label>
      <input id="admin-email" type="text" />
      <button type="submit">Add Admin</button>
    </form>
    <button
      className="cancel-btn"
      onClick={handleChangeViewClick}
    >
      View {selectedView === 'users' ? 'Posts' : 'Users'}
    </button>
    <p className="is-size-5 has-text-weight-semibold mt-6">Total entries: {selectedView === 'users' ? users?.length : posts?.length}</p>
    <button
      className="cta-btn"
      onClick={handleAddClick}
    >
      Add A New {selectedView === 'users' ? 'User' : 'Post'}
    </button>
    {error ? <p className="help has-text-danger is-size-4">{error}</p> : null}
    {users
      ? <table>
        <caption className="post--title">{selectedView === 'users' ? 'Users' : 'Posts'}</caption>
        <thead>
          <tr>
            {renderTableHeadings(selectedView === 'users' ? users : posts)}
          </tr>
        </thead>
        <tbody>
          {renderTableBodyRows(selectedView === 'users' ? users : posts)}
        </tbody>
      </table>
      : <p className="is-size-4">Loading Data...</p>}
  </div>
  )
}
