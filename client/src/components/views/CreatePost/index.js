import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from 'api'

import { UserContext } from 'UserContext'

const repo = api()

export const CreatePost = () => {
  const history = useHistory()
  const [feedbackMessage, setFeedbackMessage] = useState({})
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
      content: inputs[0].value,
      datePosted: new Date().toISOString()
    }

    try {
      await repo.addPost(postInfo)
      // TODO: Display message on success
      setFeedbackMessage({ text: 'Post Successful!', textClass: 'success' })
    } catch (err) {
      // TODO: Add spot in UI to display err
      console.log(err)
      setFeedbackMessage({ text: 'Error occurred trying to post', textClass: 'danger' })
    }
  }

  return (<main className="write-post-container flex flex--column flex--align-center">
    {
      !user
        ? <h3 className="section-heading">Redirecting to Login</h3>
        : <>
          <h3 id="write-post-heading" className="section-heading"> Write A Post</h3>
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
              <p className="post--date">{new Date().toDateString()}</p>
              <img tabIndex="0" className="post--message-icon filter-primary" src="img/icons/chatbox-ellipses.svg" alt="" />
            </div>
            <button className="button" type="submit">Create Post</button>
          </form>
        </>
    }
  </main>)
}
