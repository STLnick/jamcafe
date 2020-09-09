import React, { useEffect, useState } from 'react'

import api from 'api'

import './Admin.scss'

const repo = api()

// TODO: Add some way to identify a User as Admin, if they aren't redirect them away from this page
export const Admin = () => {
  const [posts, setPosts] = useState(null)
  const [users, setUsers] = useState(null)
  const [selectedView, setSelectedView] = useState('users')

  useEffect(() => {
    (async () => {
      setPosts(await repo.getAllPosts())
      setUsers(await repo.getAllUsers())
    })()
  }, [])

  const handleChangeViewClick = () => setSelectedView(prevView => prevView === 'users' ? 'posts' : 'users')

  // TODO: Add a way to manually Add a User or Post for the Admin
  const handleAddClick = async (e) => {
    console.log('Trying to ADD a new item!')
  }

  // TODO: Wire up the delete to remove a User or Post from MongoDB
  // TODO: Figure out how to remove a user from Firebase
  const handleDeleteClick = async (e) => {
    console.log('Trying to DELETE this item!')
    console.log(e.target.closest('button').dataset.id)
    try {
      selectedView === 'posts'
        ? await repo.deletePost({ _id: e.target.closest('button').dataset.id })
        : await repo.deleteUser()
      console.log('Success!')
    } catch (err) {
      console.log('Fail: ', err)
    }
  }

  // TODO: Add a way to manually Add or Update a User or Post for the Admin
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
        .concat(<td key="edit" className="flex flex--align-center flex--justify-center">
          <button
            className="admin-icon"
            data-id={el._id}
            onClick={(e) => handleEditClick(e)}
          >
            <img className="filter-primary" src="img/icons/pencil.svg" />
          </button>
        </td>)
        .concat(<td key="delete" className="flex flex--align-center flex--justify-center">
          <button
            className="admin-icon"
            data-id={el._id}
            onClick={(e) => handleDeleteClick(e)}
          >
            <img className="filter-primary" src="img/icons/trash.svg" />
          </button>
        </td>)}
    </tr>)
  }

  return (<div className="admin-container flex flex--column flex--align-center">
    <h3 className="section-heading">Admin Dashboard</h3>
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
