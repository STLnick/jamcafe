import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Form } from '../../components'

export const Login = () => {
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
      <Form btn={button} formBtm={formBottom} inputs={inputs} />
    </main>
  )
}
