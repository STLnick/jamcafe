import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from 'api'

import { Form } from '../../base'

const repo = api()

export const Register = () => {
  const [registerError, setRegisterError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = Array.from(e.target.elements)
      .filter(el => el.id)
      .reduce((info, el) => {
        info[el.id] = el.value
        return info
      }, {})

    // Make POST request to server to create new user
    const responseText = await repo.registerUser(userInfo)

    // Check for error and display appropriate message
    if (responseText.includes('Error')) {
      if (responseText.includes('email')) {
        setRegisterError('Account exists with that email already')
      } else if (responseText.includes('username')) {
        setRegisterError('Username is taken')
      } else {
        setRegisterError('Error occurred interacting with database. Try again.')
      }
    }

    // TODO: redirect the user to login?home?editProfile?
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
