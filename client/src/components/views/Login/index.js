import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from 'api'
import utils from 'utils'

import { Form } from '../../base'

const repo = api()

export const Login = () => {
  const [loginError, setLoginError] = useState('')

  const determineErrorMessage = (res) => {
    return res === null
      ? 'Incorrect user credentials'
      : 'Error occurred interacting with database. Try again.'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    // Make POST request to server to create new user
    const response = await repo.loginUser(userInfo)

    // Success if response is an object - Error if type is string
    response
      ? setLoginError('')
      // TODO: redirect the user to login?home?editProfile?
      // TODO: need to do something with the returned userObject?
      : setLoginError(() => determineErrorMessage(response))

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
