import React from 'react'
import { Link } from 'react-router-dom'

import { Form } from '../../components'

export const Register = () => {
  const button = <button className="cta-btn" type="submit">Sign Up</button>

  const inputs = [
    {
      htmlFor: 'fname',
      id: 'fname',
      placeholder: 'First Name',
      type: 'text'
    },
    {
      htmlFor: 'lname',
      id: 'lname',
      placeholder: 'Last Name',
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
      <Form btn={button} formBtm={formBottom} inputs={inputs} />
    </main>
  )
}
