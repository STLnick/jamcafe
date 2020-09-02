import React from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import api from 'api'

const repo = api()

export const Card = ({ post: { content, date, title, user } }) => {
  const history = useHistory()

  const handleUsernameClick = async () => {
    // fetch user from database based on username
    const userObj = await repo.getUserByUsername(user)
    history.push(`/profile/${user}`, { userProp: userObj })
  }

  return (
    <div className="post flex flex--column flex--align-center">
      <h4 className="post--title">{title}</h4>
      {/* TODO: Need to configure actual paths to user profile */}
      <button onClick={() => handleUsernameClick()}>{user}</button>

      <div className="post--content">
        <p>{content}</p>
      </div>
      <div className="post-footer flex flex--align-center flex--justify-between">
        <p className="post--date">{date}</p>
        <Link to='/message'>
          <button className="message-icon-container">
            <img src="img/icons/chatbox-ellipses.svg" alt="" className="post--message-icon filter-primary" />
          </button>
        </Link>
      </div>
    </div>
  )
}

Card.propTypes = {
  post: PropTypes.object
}
