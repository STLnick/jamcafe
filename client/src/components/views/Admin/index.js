import React, { useEffect, useState } from 'react'

import api from 'api'

import './Admin.scss'

const repo = api()

export const Admin = () => {
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      setPosts(await repo.getAllPosts())
      setUsers(await repo.getAllUsers())
    })()
  }, [])

  return (<div className="admin-container flex flex--column flex--align-center">
    <h3 className="section-heading">Admin Dashboard</h3>
    <table>
      <caption>Users</caption>
      <thead>
        <tr>
          <td>Test 1</td>
          <td>Test 2</td>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>)
}
