import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from 'api'
import auth from 'auth'
import utils from 'utils'

import { Form } from '../../base'
import { UserContext } from 'UserContext'

const usersAPI = api('users')

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

const buttonVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 2.5
    }
  }
}

const formBottomVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 3
    }
  }
}

export const Register = () => {
  const history = useHistory()
  const [registerError, setRegisterError] = useState('')
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    // Check if username is taken before attempting to create firebase auth
    if (await usersAPI.showOne(userInfo.username)) {
      setRegisterError('Username is taken')
    } else {
      auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(async () => {
          // get the uid then make request to add user to database
          const userResponse = await usersAPI.create({
            uid: auth.currentUser.uid,
            name: userInfo.name,
            username: userInfo.username
          })
          setUser(userResponse.ops[0])
          setRegisterError('')
          history.push('/feed')
        })
        .catch((err) => {
          // TODO: Provide feedback in UI if an error occurs
          setRegisterError(err.message)
        })
    }
  }

  const button = <motion.button
    inital="hidden"
    animate="visible"
    className="cta-btn"
    type="submit"
    variants={buttonVariants}
  >
    Sign Up
  </motion.button>

  const inputs = [
    {
      htmlFor: 'name',
      id: 'name',
      placeholder: 'Name',
      type: 'text'
    },
    {
      htmlFor: 'username',
      id: 'username',
      placeholder: 'User Name',
      type: 'text'
    },
    {
      htmlFor: 'email',
      id: 'email',
      placeholder: 'Email',
      type: 'email'
    },
    {
      htmlFor: 'password',
      id: 'password',
      placeholder: 'Password',
      type: 'password'
    }
  ]

  const formBottom = <motion.div
    initial="hidden"
    animate="visible"
    className="register-form-bottom"
    variants={formBottomVariants}
  >
    <p>Already registered?</p>
    <Link className="login-link" to='/login' >Login</Link>
  </motion.div>

  return (
    <motion.main
      className="register-container flex flex--column flex--align-center flex--justify-center"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={wrapperVariants}
    >
      <motion.h3
        className="section-heading"
        variants={headerVariants}
      >
        Join The Jam
      </motion.h3>
      <Form
        btn={button}
        errorMsg={registerError}
        formBtm={formBottom}
        handler={handleSubmit}
        inputs={inputs}
      />
    </motion.main>
  )
}
