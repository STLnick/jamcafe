import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Card } from '../../base'
import api from 'api'
import { UserContext } from 'UserContext'

import { SearchBar } from '../../base'

import './Feed.scss'

const postsAPI = api('posts')

const wrapperVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.25,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

const headerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1
    }
  }
}

export const Feed = () => {
  const history = useHistory()
  const [filteredPosts, setFilteredPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [searchSelection, setSearchSelection] = useState('title')
  const [searchText, setSearchText] = useState('')
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
    searchSelection === 'title'
      ? setFilteredPosts(() => posts
        .filter(({ title }) => title.toLowerCase().includes(searchText.toLowerCase())))
      : setFilteredPosts(() => posts
        .filter(({ user }) => user.toLowerCase().includes(searchText.toLowerCase())))
  }, [posts, searchSelection, searchText])

  const handleSearchSelectionChange = (e) => {
    e.preventDefault()
    setSearchSelection(e.target.elements[0].value)
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  const renderFilteredPosts = () => filteredPosts
    .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    .map((post, i) => <Card key={i} post={post} userLoggedIn={user} />)

  return (
    <motion.div
      className="posts flex flex--column flex--align-center flex--justify-start"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={wrapperVariants}
    >
      <motion.h3
        className="section-heading"
        variants={headerVariants}
      >
        User Posts
      </motion.h3>
      <SearchBar
        handleSearchSelectionChange={handleSearchSelectionChange}
        handleSearchTextChange={handleSearchTextChange}
        searchSelection={searchSelection}
        searchText={searchText}
      />
      {renderFilteredPosts()}
      <Link to="/post" className="write-post-link">
        <img
          tabIndex="0"
          src="img/icons/add-circle-sharp.svg"
          className="write-post-icon filter-primary"
          alt="Plus icon to write a post" />
      </Link>
    </motion.div>
  )
}

Feed.propTypes = {
  searchSelection: PropTypes.string,
  searchText: PropTypes.string
}
