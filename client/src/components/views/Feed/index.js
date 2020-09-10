import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Card } from '../../base'
import api from 'api'
import { UserContext } from 'UserContext'

const postsAPI = api('posts')

export const Feed = ({ searchText }) => {
  const history = useHistory()
  const [filteredPosts, setFilteredPosts] = useState([])
  const [posts, setPosts] = useState([])
  const { user } = useContext(UserContext)

  if (!user) {
    history.push('/login')
  }

  useEffect(() => {
    (async () => {
      const dbPosts = await postsAPI.show()
      setFilteredPosts(() => dbPosts.map(post => post))
      setPosts(() => dbPosts.map(post => post))
    })()
  }, [])

  useEffect(() => {
    setFilteredPosts(() => posts
      .filter(({ title }) => title.toLowerCase().includes(searchText.toLowerCase())))
  }, [posts, searchText])

  const renderFilteredPosts = () => filteredPosts
    .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    .map((post, i) => <Card key={i} post={post} userLoggedIn={user} />)

  return (
    <div className="posts flex flex--column flex--align-center flex--justify-start">
      <h3 className="section-heading">User Posts</h3>
      {renderFilteredPosts()}
      <Link to="/post" className="write-post-link">
        <img
          tabIndex="0"
          src="img/icons/add-circle-sharp.svg"
          className="write-post-icon filter-primary"
          alt="Plus icon to write a post" />
      </Link>
    </div>
  )
}

Feed.propTypes = {
  searchText: PropTypes.string
}
