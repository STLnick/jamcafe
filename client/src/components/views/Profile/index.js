import { motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Link, useLocation } from 'react-router-dom'

import api from 'api'
import { UserContext } from 'UserContext'
import utils from 'utils'

import './Profile.scss'
import { ReactComponent as EditIcon } from '../../../assets/pencil.svg'
import { ReactComponent as GuitarIcon } from '../../../assets/electric-guitar.svg'
import { ReactComponent as BassIcon } from '../../../assets/bass-guitar.svg'
import { ReactComponent as DrumIcon } from '../../../assets/snare-drum.svg'
import { ReactComponent as VocalsIcon } from '../../../assets/microphone.svg'
import { ReactComponent as PianoIcon } from '../../../assets/piano.svg'
import { ReactComponent as NoteIcon } from '../../../assets/note.svg'

const postsAPI = api('posts')
const usersAPI = api('users')

Modal.setAppElement('#root')

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
  },
  exit: {
    opacity: 0,
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
}

const fieldVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export const Profile = () => {
  const location = useLocation()
  const [isLoggedInUsersProfile, setIsLoggedInUsersProfile] = useState(false)
  const [modal, setModal] = useState({ isOpen: false, clickedPostToEdit: {}, error: '' })
  const [profile, setProfile] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const { user } = useContext(UserContext)

  useEffect(() => {
    (async () => {
      const profileRes = await usersAPI.showOne(location.pathname.slice(9))
      setProfile(() => profileRes)
    })()
  }, [location.pathname])

  useEffect(() => {
    (async () => {
      if (profile) {
        setUserPosts(await postsAPI.showOne(profile.username))
        setIsLoggedInUsersProfile(user?.username === profile.username)
      }
    })()
  }, [profile, user?.username])

  const handleEditClick = (e) => {
    const targetPostId = e.target.closest('button').dataset.id
    const postToEdit = userPosts.find(post => post._id === targetPostId)
    setModal((prevModal) => ({ ...prevModal, isOpen: true, clickedPostToEdit: postToEdit }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    const editedPostInfo = utils.createObjectFromFields(e.target.elements)
    editedPostInfo._id = modal.clickedPostToEdit._id
    editedPostInfo.uid = modal.clickedPostToEdit.uid
    editedPostInfo.datePosted = new Date(modal.clickedPostToEdit.datePosted).toISOString()

    try {
      await postsAPI.update(editedPostInfo)
      setUserPosts(await postsAPI.showOne(profile.username))
      setModal({ isOpen: false })
    } catch (err) {
      setModal({ error: err })
    }
  }

  const renderInstrumentIcons = () => profile.instruments.map((instrument, i) => {
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

  const renderUserPosts = () => userPosts.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    .map(({ _id, uid, content, datePosted, title }, i) => (<div className="profile-post" key={i}>
      <h4 className="post--title is-size-4">{title}</h4>
      <p className="is-size-5">{content}</p>
      <p className="post--date">{datePosted.slice(0, 10)}</p>
      {isLoggedInUsersProfile
        ? <button
          className="cancel-btn small-btn mt-4 flex flex--align-center"
          data-id={_id}
          onClick={(e) => handleEditClick(e)}
        >
          <EditIcon className="filter-primary small-icon" />
          Edit Post
        </button>
        : null}
    </div>))

  return <>
    <motion.h3
      className="section-heading no-flex-heading has-text-centered"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={headerVariants}
    >
      View Profile
    </motion.h3>
    <motion.main
      className="view-profile-container flex flex--column flex--align-center flex--justify-center"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={wrapperVariants}
    >
      {profile
        ? <>
          <motion.div
            className="profile-container flex flex--column flex--align-center flex--justify-around"
            variants={containerVariants}
          >
            <motion.h4
              id="name"
              className="profile-title"
              variants={fieldVariants}
            >
              {profile.username}
            </motion.h4>
            <motion.img
              alt="User avatar"
              className="avatar big"
              src={profile.avatar || 'img/avatar.jpg'}
              variants={fieldVariants}
            />
            <h6 className="profile-field-heading">Bio</h6>
            <motion.p
              id="bio"
              className="profile-field"
              variants={fieldVariants}
            >
              {profile.bio}
            </motion.p>
            <h6 className="profile-field-heading">Location</h6>
            <motion.p
              id="location"
              className="profile-field"
              variants={fieldVariants}
            >
              {profile.location ? profile.location : ''}
            </motion.p>
            <h6 className="profile-field-heading">Genres</h6>
            <motion.p
              id="genres"
              className="profile-field"
              variants={fieldVariants}
            >
              {profile.genres ? profile.genres.join(', ') : ''}
            </motion.p>
            <h6 className="profile-field-heading">Instruments</h6>
            <motion.div
              id="instruments"
              variants={fieldVariants}
            >
              {profile.instruments ? renderInstrumentIcons() : ''}
            </motion.div>
          </motion.div>
          {isLoggedInUsersProfile
            ? <Link
              className="cancel-btn mt-6"
              to={`/profile/edit/${user.username}`}>
              Edit Profile
        </Link>
            : <Link
              className="cta-btn mt-6"
              to={`/message?${profile.username}`}>
              Send A Message
        </Link>}
          <h3 className="section-heading profile-posts-heading">Posts By {profile.username}</h3>
          <div className="profile-posts-container">
            {userPosts ? renderUserPosts() : null}
          </div>
          <Modal
            isOpen={modal.isOpen}
            onRequestClose={() => setModal(prevModal => ({ ...prevModal, isOpen: false }))}
            style={{
              content: {
                height: '575px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
              }
            }}
          >
            <form
              className="edit-post-form flex flex--column flex--align-center flex--justify-between"
              onSubmit={(e) => handleEditSubmit(e)}
            >
              <label htmlFor="title" className="profile-field-heading">Title</label>
              <input id="title" type="text" defaultValue={modal.clickedPostToEdit?.title} />
              <label htmlFor="content" className="profile-field-heading">Content</label>
              <input id="content" type="text" defaultValue={modal.clickedPostToEdit?.content} />
              <button
                className="cancel-btn"
                onClick={() => setModal(prevModal => ({ ...prevModal, isOpen: false }))}
              >
                Cancel
            </button>
              <button className="cta-btn" type="submit">Confirm Changes</button>
            </form>
          </Modal>
        </>
        : <h3>Loading...</h3>}
    </motion.main>
  </>
}
