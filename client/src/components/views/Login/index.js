import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from 'api'
import auth from 'auth'
import utils from 'utils'

import { Form } from '../../base'
import { UserContext } from 'UserContext'

const repo = api()

export const Login = () => {
  const history = useHistory()
  const [loginError, setLoginError] = useState('')
  const { user, setUser } = useContext(UserContext)

  const determineErrorMessage = (res) => {
    return res === null
      ? 'Incorrect user credentials'
      : 'Error occurred interacting with database. Try again.'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    auth.signInWithEmailAndPassword(userInfo.email, userInfo.password)
      .then(async (res) => {
        const loggedInUser = await repo.loginUser({ uid: auth.currentUser.uid })
        console.log('uid: ', auth.currentUser.uid)
        console.log(loggedInUser)
        setUser(loggedInUser)
        setLoginError('')
      })
      .catch(err => {
        setLoginError(err.message)
      })
  }

  const button = <button className="cta-btn" type="submit">Login</button>

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

  const formBottom = <div className="register-form-bottom">
    <p>Not registered yet?</p>
    <Link className="login-link" to='/register' >Register</Link>
    <Link className="login-link" to='/forgot' >Forgot Password?</Link>
  </div>

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
