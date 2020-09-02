import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from 'api'
import utils from 'utils'

import { Form } from '../../base'

const repo = api()

export const Register = () => {
  const [registerError, setRegisterError] = useState('')

  const determineErrorMessage = (text) => {
    if (text.includes('email')) {
      return 'Account exists with that email already'
    } else if (text.includes('username')) {
      return 'Username is taken'
    } else {
      return 'Error occurred interacting with database. Try again.'
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    // Make POST request to server to create new user
    const response = await repo.registerUser(userInfo)

    // Success if response is an object - Error if type is string
    typeof response === 'object'
      ? setRegisterError('')
      // TODO: redirect the user to login?home?editProfile?
      // TODO: need to do something with the returned userObject?
      : setRegisterError(() => determineErrorMessage(response))
  }

  const button = <button className="cta-btn" type="submit">Sign Up</button>

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

  const formBottom = <div className="register-form-bottom">
    <p>Already registered?</p>
    <Link className="login-link" to='/login' >Login</Link>
  </div>

  return (
    <main className="register-container flex flex--column flex--align-center flex--justify-center">
      <h3 className="section-heading">Join The Jam</h3>
      <Form
        btn={button}
        errorMsg={registerError}
        formBtm={formBottom}
        handler={handleSubmit}
        inputs={inputs}
      />
    </main>
  )
}
