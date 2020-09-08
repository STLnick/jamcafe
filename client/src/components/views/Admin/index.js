import React, { useEffect, useState } from 'react'

import api from 'api'

import './Admin.scss'

const repo = api()

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

  const renderTableHeadings = (resource) => Object.keys(resource[0]).map(key => <td key={key}>{key}</td>)

  const renderTableBodyRows = (resource) => {
    const keys = Object.keys(resource[0])
    return resource.map(el => <tr>
      {keys.map(key => <td>{el[key]}</td>)}
    </tr>)
  }

  return (<div className="admin-container flex flex--column flex--align-center">
    <h3 className="section-heading">Admin Dashboard</h3>
    <button
      className="cta-btn"
      onClick={handleChangeViewClick}
    >
      View {selectedView === 'users' ? 'Posts' : 'Users'}
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
