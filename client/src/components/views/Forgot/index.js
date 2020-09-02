import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from 'api'
import utils from 'utils'

import { Form } from '../../base'

const repo = api()

export const Forgot = () => {

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    console.log(`We'll send you an email to ${userInfo.email}`)

    // TODO: Try to find a user in DB with the email
    // TODO: (?) Send a link to reset the password
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
      <Form
        btn={button}
        formBtm={formBottom}
        handler={handleSubmit}
        inputs={inputs}
      />
    </main>
  )
}
