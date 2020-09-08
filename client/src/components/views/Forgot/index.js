import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from 'api'
import auth from 'auth'
import utils from 'utils'

import { Form } from '../../base'

const repo = api()

export const Forgot = () => {
  const [forgotError, setForgotError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    auth.sendPasswordResetEmail(userInfo.email)
      .then(() => {
        setSuccessMessage(() => 'Reset email sent!')
      })
      .catch(err => {
        setForgotError(() => err)
      })
  }

  const button = <button className="cta-btn" type="submit">Reset Password</button>

  const inputs = [
    {
      htmlFor: 'email',
      id: 'email',
      placeholder: 'Email',
      type: 'email'
    }
  ]

  const formBottom = <div className="register-form-bottom">
    <p>Not registered yet?</p>
    <Link className="login-link" to='/register' >Register</Link>
    <p>Just remember that password?</p>
    <Link className="login-link" to='/login' >Login</Link>
  </div>

  return (
    <main className="register-container flex flex--column flex--align-center flex--justify-center">
      <h3 className="section-heading">We All Forget Sometimes</h3>
      {successMessage
        ? <p className="help has-text-success is-size-3">{successMessage}</p>
        : null}
      <Form
        btn={button}
        errorMsg={forgotError}
        formBtm={formBottom}
        handler={handleSubmit}
        inputs={inputs}
      />
    </main>
  )
}
