import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Card } from '../../base'
import api from 'api'
import { UserContext } from 'UserContext'

const repo = api()

export const Feed = () => {
  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    (async () => {
      const dbPosts = await repo.getAllPosts()
      setPosts(() => dbPosts.map(post => {
        post.date = post.datePosted.slice(0, 10)
        return post
      }))
    })()
  }, [])

  const renderPosts = () => posts
    .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    .map((post, i) => <Card key={i} post={post} userLoggedIn={user} />)

  return (
    <div className="posts flex flex--column flex--align-center flex--justify-start">
      <h3 className="section-heading">User Posts</h3>
      {renderPosts()}
      <Link to="/post" className="write-post-link">
        <img
          tabindex="0"
          src="img/icons/add-circle-sharp.svg"
          className="write-post-icon filter-primary"
          alt="Plus icon to write a post" />
      </Link>
    </div>
  )
}
