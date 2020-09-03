import React, { useContext, useEffect, useState } from 'react'

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

  const renderPosts = () => {
    return posts.map((post, i) => {
      return <Card key={i} post={post} userLoggedIn={user} />
    })
  }

  return (
    <div className="posts flex flex--column flex--align-center flex--justify-start">
      <h3 className="section-heading">User Posts</h3>
      {renderPosts()}
    </div>
  )
}
