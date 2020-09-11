import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'

import api from 'api'
import firebaseApi from 'firebaseApi'
import { UserContext } from 'UserContext'
import utils from 'utils'

import './Admin.scss'

const postsAPI = api('posts')
const usersAPI = api('users')

Modal.setAppElement('#root')

export const Admin = () => {
  const history = useHistory()
  const [error, setError] = useState('')
  const [editModal, setEditModal] = useState({ isOpen: false, currentItemToEdit: {}, error: '' })
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [selectedView, setSelectedView] = useState('users')
  const { user } = useContext(UserContext)

  if (user && !user.admin) {
    history.push('/feed')
  } else if (!user) {
    history.push('/login')
  }

  useEffect(() => {
    (async () => {
      setPosts(await postsAPI.show())
      setUsers(await usersAPI.show())
    })()
  }, [])

  const handleChangeViewClick = () => setSelectedView(prevView => prevView === 'users' ? 'posts' : 'users')

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    const adminEmail = e.target.elements[0].value.trim()
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
        // TODO: Display result on UI
        console.log(firebaseResult)
      }
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditClick = (e) => {
    const rowId = e.target.closest('button').dataset.id
    const clickedItemToEdit = selectedView === 'users'
      ? users.find(user => user._id === rowId)
      : posts.find(post => post._id === rowId)
    setEditModal({ isOpen: true, currentItemToEdit: clickedItemToEdit })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    const updatedObj = utils.createObjectFromFields(e.target.elements)
    updatedObj._id = editModal.currentItemToEdit._id
    updatedObj.uid = editModal.currentItemToEdit.uid
    if (selectedView === 'posts') {
      updatedObj.datePosted = new Date(editModal.currentItemToEdit.datePosted).toISOString()
    }

    if (selectedView === 'users') { // Editing a User
      if (editModal.currentItemToEdit.username !== updatedObj.username && await usersAPI.showOne(updatedObj.username)) {
        setEditModal({ error: 'Username is taken' })
      } else {
        setEditModal({ error: '' })
        try {
          await usersAPI.update(updatedObj)

          // Find ALL posts by user and change 'user' to new username
          if (editModal.currentItemToEdit.username !== updatedObj.username) {
            const userPosts = await postsAPI.showOne(editModal.currentItemToEdit.username)
            userPosts.forEach(async (post) => {
              await postsAPI.update({ ...post, user: updatedObj.username })
            })
          }
          setUsers(await usersAPI.show())
          setPosts(await postsAPI.show())
          setEditModal({ isOpen: false })
        } catch (err) {
          setEditModal({ error: err })
        }
      }
    } else { // Editing a Post
      try {
        await postsAPI.update(updatedObj)
        setPosts(await postsAPI.show())
        setEditModal({ isOpen: false })
      } catch (err) {
        setEditModal({ error: err })
      }
    }
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
    {/* EDIT MODAL */}
    <Modal
      isOpen={editModal.isOpen}
      onRequestClose={() => setEditModal(prevModal => ({ ...prevModal, isOpen: false }))}>
      <form onSubmit={(e) => handleEditSubmit(e)}>
        {editModal.error ? <p className="help has-text-danger is-size-4">{editModal.error}</p> : null}
        {selectedView === 'users'
          ? <>
            <label className="is-size-4" htmlFor="_id">_id</label>
            <p className="is-size-5 has-text-weight-semibold">{editModal.currentItemToEdit?._id}</p>
            <label className="is-size-4" htmlFor="uid">uid</label>
            <p className="is-size-5 has-text-weight-semibold">{editModal.currentItemToEdit?.uid}</p>
            <label className="is-size-4" htmlFor="name">name</label>
            <input
              className="my-input"
              id="name"
              type="text"
              defaultValue={editModal.currentItemToEdit?.name}
            />
            <label className="is-size-4" htmlFor="username">username</label>
            <input
              className="my-input"
              id="username"
              type="text"
              defaultValue={editModal.currentItemToEdit?.username}
            />
          </>
          : <>
            <label className="is-size-4">_id</label>
            <p className="is-size-5 has-text-weight-semibold">{editModal.currentItemToEdit?._id}</p>
            <label className="is-size-4">uid</label>
            <p className="is-size-5 has-text-weight-semibold">{editModal.currentItemToEdit?.uid}</p>
            <label className="is-size-4" htmlFor="user">user</label>
            <p className="is-size-5 has-text-weight-semibold">{editModal.currentItemToEdit?.user}</p>
            <label className="is-size-4" htmlFor="title">title</label>
            <input
              className="my-input"
              id="title"
              type="text"
              defaultValue={editModal.currentItemToEdit?.title}
            />
            <label className="is-size-4" htmlFor="content">content</label>
            <input
              className="my-input"
              id="content"
              type="text"
              defaultValue={editModal.currentItemToEdit?.content}
            />
            <label className="is-size-4" htmlFor="datePosted">datePosted</label>
            <input
              className="my-input"
              id="datePosted"
              type="text"
              defaultValue={editModal.currentItemToEdit?.datePosted}
            />
          </>}

        <div className="flex">
          <button className="cancel-btn" onClick={() => setEditModal(prevModal => ({ ...prevModal, isOpen: false }))}>
            Close
          </button>
          <button className="cta-btn" type="submit">Confirm Changes</button>
        </div>
      </form>
    </Modal >
  </div >
  )
}
