import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import api from 'api'

import './Card.scss'
import { ReactComponent as MessageIcon } from '../../../assets/chatbox-ellipses.svg'
import { ReactComponent as GuitarIcon } from '../../../assets/electric-guitar.svg'
import { ReactComponent as BassIcon } from '../../../assets/bass-guitar.svg'
import { ReactComponent as DrumIcon } from '../../../assets/snare-drum.svg'
import { ReactComponent as VocalsIcon } from '../../../assets/microphone.svg'
import { ReactComponent as PianoIcon } from '../../../assets/piano.svg'
import { ReactComponent as NoteIcon } from '../../../assets/note.svg'

const usersAPI = api('users')

const postVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
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

  const renderInstrumentIcons = () => instruments.map((instrument, i) => {
    switch (instrument) {
      case 'Guitar':
        return <GuitarIcon key={i} className="instrument-icon-lg" />
      case 'Bass':
        return <BassIcon key={i} className="instrument-icon-lg" />
      case 'Drums':
        return <DrumIcon key={i} className="instrument-icon-lg" />
      case 'Vocals':
        return <VocalsIcon key={i} className="instrument-icon-lg" />
      case 'Keyboard / Piano':
        return <PianoIcon key={i} className="instrument-icon-lg" />
      default:
        return <NoteIcon key={i} className="instrument-icon-lg" />
    }
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
            <MessageIcon className="post--message-icon filter-primary" alt="Message icon" />
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
