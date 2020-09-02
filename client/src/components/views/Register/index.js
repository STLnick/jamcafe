import React from 'react'
import { Link } from 'react-router-dom'
import api from 'api'

import { Form } from '../../base'

const repo = api()

export const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()

    // TODO: get info from fields
    const userInfo = Array.from(e.target.elements)
      .filter(el => el.id)
      .reduce((info, el) => {
        info[el.id] = el.value
        return info
      }, {})

    // make post request to server to create new user
    try {
      await repo.registerUser(userInfo)
    } catch (err) {
      throw new Error(err)
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
      <Form btn={button} formBtm={formBottom} handler={handleSubmit} inputs={inputs} />
    </main>
  )
}
