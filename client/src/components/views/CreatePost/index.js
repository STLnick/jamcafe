import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { UserContext } from 'UserContext'

export const CreatePost = () => {
  const history = useHistory()
  const { user } = useContext(UserContext)


  if (!user) {
    history.push('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (<main className="write-post-container flex flex--column flex--align-center">
    {
      !user
        ? <h3 className="section-heading">Redirecting to Login</h3>
        : <>
          <h3 id="write-post-heading" className="section-heading"> Write A Post</h3>
          <form
            className="post flex flex--column flex--align-center"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label for="title-input" className="screen-reader-text">Title</label>
            <input
              type="text"
              id="title-input"
              className="my-input title-input" placeholder="Title here..."
            />
            <Link className="post--username" to={`/profile/${user.username}`}>
              <p>{user.username}</p>
            </Link>
            <div className="post--content-create">
              <label htmlFor="post--content-input" className="screen-reader-text">Post Content</label>
              <textarea name="post--content-input" id="post--content-input" placeholder="Post content here..."></textarea>
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
