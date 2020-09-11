import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from 'api'
import auth from 'auth'
import utils from 'utils'

import { Form } from '../../base'
import { UserContext } from 'UserContext'

const usersAPI = api('users')

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

export const Login = () => {
  const history = useHistory()
  const [loginError, setLoginError] = useState('')
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(async (res) => {
        const loggedInUser = await usersAPI.verify({ uid: auth.currentUser.uid })
        const userToken = await auth.currentUser.getIdTokenResult()
        setUser({ ...loggedInUser, admin: userToken.claims.admin })
        setLoginError('')
        history.push('/feed')
      })
      .catch(err => {
        setLoginError(err.message)
      })
  }

  const button = <motion.button
    inital="hidden"
    animate="visible"
    className="cta-btn"
    type="submit"
    variants={buttonVariants}
  >
    Login
  </motion.button>

  const inputs = [
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
    <p>Not registered yet?</p>
    <Link className="login-link" to='/register' >Register</Link>
    <Link className="login-link" to='/forgot' >Forgot Password?</Link>
  </motion.div>

  return (
    <main className="register-container flex flex--column flex--align-center flex--justify-center">
      <h3 className="section-heading">Start The Jam</h3>
      <Form
        btn={button}
        errorMsg={loginError}
        formBtm={formBottom}
        handler={handleSubmit}
        inputs={inputs}
      />
    </main>
  )
}
