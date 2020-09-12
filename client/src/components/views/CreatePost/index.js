import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from 'api'

import { UserContext } from 'UserContext'

import './CreatePost.scss'

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

export const CreatePost = () => {
  const history = useHistory()
  const [feedbackMessage, setFeedbackMessage] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const { user } = useContext(UserContext)


  if (!user) {
    history.push('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const inputs = Array.from(e.target.elements).filter(el => el.id)
    const postInfo = {
      uid: user.uid,
      user: user.username,
      title: inputs[0].value,
      content: inputs[1].value,
      datePosted: new Date().toISOString()
    }

    try {
      await postsAPI.create(postInfo)
      setFeedbackMessage({ text: 'Post Successful!', textClass: 'success' })
      setSubmitted(prevSubmitted => !prevSubmitted)
    } catch (err) {
      setFeedbackMessage({ text: 'Error occurred trying to post', textClass: 'danger' })
    }
  }

  return (<motion.main
    className="write-post-container flex flex--column flex--align-center"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={wrapperVariants}
  >
    {
      !user
        ? <h3 className="section-heading">Redirecting to Login</h3>
        : <>
          <motion.h3
            id="write-post-heading"
            className="section-heading"
            variants={headerVariants}
          >
            Write A Post
          </motion.h3>
          <p className={`help has-text-${feedbackMessage.textClass} is-size-3`}>{feedbackMessage.text}</p>
          <form
            className="post flex flex--column flex--align-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="title" className="screen-reader-text">Title</label>
            <input
              type="text"
              id="title"
              className="my-input title-input" placeholder="Title here..."
            />
            <Link className="post--username" to={`/profile/${user.username}`}>
              <p>{user.username}</p>
            </Link>
            <div className="post--content-create">
              <label htmlFor="content" className="screen-reader-text">Post Content</label>
              <textarea name="content" id="content" placeholder="Post content here..."></textarea>
            </div>
            <div className="post-footer flex flex--align-center flex--justify-between">
              <p className="post--date">{new Date().toISOString().slice(0, 10)}</p>
              <img tabIndex="0" className="post--message-icon filter-primary" src="img/icons/chatbox-ellipses.svg" alt="" />
            </div>
            <button className="cta-btn my-3" disabled={submitted} type="submit">Create Post</button>
          </form>
        </>
    }
  </motion.main>)
}
