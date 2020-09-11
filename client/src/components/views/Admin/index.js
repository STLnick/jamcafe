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
  const [addAdminModal, setAddAdminModal] = useState({
    isOpen: false,
    emailToMakeAdmin: '',
    error: ''
  })
  const [error, setError] = useState('')
  const [editModal, setEditModal] = useState({
    isOpen: false,
    currentItemToEdit: {},
    error: ''
  })
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [selectedView, setSelectedView] = useState('users')
  const [successMsg, setSuccessMsg] = useState('')
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

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg('')
      }, 2500)
    }
  }, [successMsg])

  const handleChangeViewClick = () => setSelectedView(prevView => prevView === 'users' ? 'posts' : 'users')

  const handleAddAdminTextChange = (e) => {
    const value = e.target.value
    setAddAdminModal(prevModal => ({ ...prevModal, emailToMakeAdmin: value }))
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()
    try {
      const result = await firebaseApi.addAdminRole(addAdminModal.emailToMakeAdmin)
      setSuccessMsg(result)
      setAddAdminModal(prevModal => ({ ...prevModal, isOpen: false }))
    } catch (err) {
      setError(err)
    }
  }

  // TODO: Add a way to manually Add a User or Post for the Admin
  // TODO: Will need to also manually add an email/password to Firebase
  const handleAddItemClick = async (e) => {
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

  const handleDeleteItemClick = async (e) => {
    const id = e.target.closest('button').dataset.id // MongoDB identifier
    const uid = e.target.closest('button').dataset.uid // Firebase identifier

    try {
      if (selectedView === 'posts') {
        await postsAPI.delete({ _id: id })
        setSuccessMsg('Post successfully deleted')
        setPosts(await postsAPI.show())
      } else {
        await usersAPI.delete({ _id: id })
        setUsers(await usersAPI.show())
        const firebaseResult = await firebaseApi.deleteUser(uid)
        setSuccessMsg(firebaseResult)
      }
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditItemClick = (e) => {
    const rowId = e.target.closest('button').dataset.id
    const clickedItemToEdit = selectedView === 'users'
      ? users.find(user => user._id === rowId)
      : posts.find(post => post._id === rowId)
    setEditModal({ isOpen: true, currentItemToEdit: clickedItemToEdit })
  }

  const handleEditItemSubmit = async (e) => {
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
          setSuccessMsg('User successfully updated!')
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
        setSuccessMsg('Post successfully updated!')
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
            onClick={(e) => handleEditItemClick(e)}
          >
            <img className="filter-primary" alt="Edit icon" src="img/icons/pencil.svg" />
          </button>
        </td>)
        .concat(<td key="delete">
          <button
            className="admin-icon"
            data-id={el._id}
            data-uid={el.uid}
            onClick={(e) => handleDeleteItemClick(e)}
          >
            <img className="filter-primary" alt="Delete icon" src="img/icons/trash.svg" />
          </button>
        </td>)}
    </tr>)
  }

  return (<div className="admin-container flex flex--column flex--align-center">
    <h3 className="section-heading">Admin Dashboard</h3>
    <button
      className="cancel-btn small-btn mx-3 my-3"
      onClick={() => setAddAdminModal(prevModal => ({ ...prevModal, isOpen: true }))}
    >
      Add A New Admin
    </button>
    {/* Add Admin modal */}
    <Modal
      isOpen={addAdminModal.isOpen}
      onRequestClose={() => setAddAdminModal(prevModal => ({ ...prevModal, isOpen: false }))}
      style={{
        content: {
          height: '275px',
          left: '50%',
          top: '25%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
        }
      }}
    >
      <form
        className="admin-modal-form flex flex--column flex--align-center flex--justify-between"
        onSubmit={(e) => handleAddAdmin(e)}
      >
        <label
          className="medium-label"
          htmlFor="admin-email"
        >
          Email to Make an Admin
        </label>
        <input
          className="my-input"
          id="admin-email"
          onChange={(e) => handleAddAdminTextChange(e)}
          type="text"
          value={addAdminModal.emailToMakeAdmin}
        />
        <button
          className="cancel-btn"
          onClick={() => setAddAdminModal(prevModal => ({ ...prevModal, isOpen: false }))}
        >
          Cancel
        </button>
        <button
          className="cta-btn"
          type="submit"
        >
          Add Admin
        </button>
      </form>
    </Modal>
    <p className="is-size-5 has-text-weight-semibold mt-6">
      Total entries: {selectedView === 'users' ? users?.length : posts?.length}
    </p>
    <div className="flex">
      <button
        className="cancel-btn small-btn mx-3 my-3"
        onClick={handleChangeViewClick}
      >
        View {selectedView === 'users' ? 'Posts' : 'Users'}
      </button>
      <button
        className="cta-btn small-btn mx-3 my-3"
        onClick={handleAddItemClick}
      >
        Add A New {selectedView === 'users' ? 'User' : 'Post'}
      </button>
    </div>
    {successMsg ? <p className="help has-text-success is-size-4">{successMsg}</p> : null}
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
      onRequestClose={() => setEditModal(prevModal => ({ ...prevModal, isOpen: false }))}
      style={{
        content: {
          height: '550px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65%'
        }
      }}
    >
      <form
        className="edit-modal-form flex flex--column flex--align-center flex--justify-between"
        onSubmit={(e) => handleEditItemSubmit(e)}
      >
        {editModal.error ? <p className="help has-text-danger is-size-4">{editModal.error}</p> : null}
        {selectedView === 'users'
          ? <>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="_id">_id</label>
              <p className="is-size-5 has-text-weight-semibold">
                {editModal.currentItemToEdit?._id}
              </p>
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="uid">uid</label>
              <p className="is-size-5 has-text-weight-semibold">
                {editModal.currentItemToEdit?.uid}
              </p>
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="name">name</label>
              <input
                className="my-input"
                id="name"
                type="text"
                defaultValue={editModal.currentItemToEdit?.name}
              />
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="username">username</label>
              <input
                className="my-input"
                id="username"
                type="text"
                defaultValue={editModal.currentItemToEdit?.username}
              />
            </div>
          </>
          : <>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4">_id</label>
              <p className="is-size-5 has-text-weight-semibold">
                {editModal.currentItemToEdit?._id}
              </p>
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4">uid</label>
              <p className="is-size-5 has-text-weight-semibold">
                {editModal.currentItemToEdit?.uid}
              </p>
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="user">user</label>
              <p className="is-size-5 has-text-weight-semibold">
                {editModal.currentItemToEdit?.user}
              </p>
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="title">title</label>
              <input
                className="my-input"
                id="title"
                type="text"
                defaultValue={editModal.currentItemToEdit?.title}
              />
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="content">content</label>
              <textarea
                className="my-input"
                id="content"
                defaultValue={editModal.currentItemToEdit?.content}
              ></textarea>
            </div>
            <div className="flex flex--column flex--align-center">
              <label className="is-size-4" htmlFor="datePosted">datePosted</label>
              <input
                className="my-input"
                id="datePosted"
                type="text"
                defaultValue={editModal.currentItemToEdit?.datePosted}
              />
            </div>
          </>}

        <button
          className="cancel-btn"
          onClick={() => setEditModal(prevModal => ({ ...prevModal, isOpen: false }))}
        >
          Cancel
          </button>
        <button className="cta-btn" type="submit">
          Confirm Changes
          </button>
      </form>
    </Modal >
  </div >
  )
}
