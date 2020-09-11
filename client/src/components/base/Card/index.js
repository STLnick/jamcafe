import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import api from 'api'

const usersAPI = api('users')

const postVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.25,
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  }
}

const postItemVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15
    }
  }
}

export const Card = ({ post: { content, datePosted, title, user }, userLoggedIn }) => {
  const history = useHistory()
  const [avatar, setAvatar] = useState(null)
  const [instruments, setInstruments] = useState([])

  const handleUsernameClick = () => {
    history.push(`/profile/${user}`)
  }

  useEffect(() => {
    (async () => {
      const postUser = await usersAPI.showOne(user)
      setAvatar(postUser.avatar)
      setInstruments(postUser.instruments)
    })()
  }, [user])


  const determineInstrumentIcon = (instrument) => {
    switch (instrument) {
      case 'Guitar':
        return 'img/icons/electric-guitar.svg'
      case 'Bass':
        return 'img/icons/bass-guitar.svg'
      case 'Drums':
        return 'img/icons/snare-drum.svg'
      case 'Vocals':
        return 'img/icons/microphone.svg'
      case 'Keyboard / Piano':
        return 'img/icons/piano.svg'
      default:
        return 'img/icons/note.svg'
    }
  }

  const renderInstrumentIcons = () => instruments.map(instrument => {
    return <motion.img
      key={instrument}
      className="instrument-icon"
      src={determineInstrumentIcon(instrument)}
      alt={`${instrument} icon`}
      variants={iconVariants}
    />
  })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="post flex flex--column flex--align-center"
      variants={postVariants}
    >
      <motion.h4
        className="post--title"
        variants={postItemVariants}
      >
        {title}
      </motion.h4>
      <motion.div
        className="flex flex--align-center"
        variants={postItemVariants}
      >
        <img className="avatar" src={avatar || 'img/avatar.jpg'} alt="User avatar" />
        <button className="has-text-weight-bold username-btn" onClick={() => handleUsernameClick()}>{user}</button>
      </motion.div>
      <motion.div
        className="flex flex--align-center user-instruments"
        variants={postItemVariants}
      >
        <span className="is-size-5 has-text-weight-semibold">Plays:</span>
        {instruments ? renderInstrumentIcons() : null}
      </motion.div>
      <motion.div
        className="post--content"
        variants={postItemVariants}
      >
        <p>{content}</p>
      </motion.div>
      <motion.div
        className="post-footer flex flex--align-center flex--justify-between"
        variants={postItemVariants}
      >
        <p className="post--date">{datePosted.slice(0, 10)}</p>
        <Link to={`/message?${user}`}>
          <button className="message-icon-container">
            <img src="img/icons/chatbox-ellipses.svg" alt="" className="post--message-icon filter-primary" />
          </button>
        </Link>
      </motion.div>
    </motion.div>
  )
}

Card.propTypes = {
  post: PropTypes.object,
  userLoggedIn: PropTypes.object
}
