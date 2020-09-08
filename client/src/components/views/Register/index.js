import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from 'api'
import auth from 'auth'
import utils from 'utils'

import { Form } from '../../base'
import { UserContext } from 'UserContext'

const repo = api()

export const Register = () => {
  const history = useHistory()
  const [registerError, setRegisterError] = useState('')
  const { setUser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userInfo = utils.createObjectFromFields(e.target.elements)

    // Check if username is taken before attempting to create firebase auth
    if (await repo.getUserByUsername(userInfo.username)) {
      setRegisterError('Username is taken')
    } else {
      auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
        .then(async () => {
          // get the uid then make request to add user to database
          const userResponse = await repo.registerUser({
            uid: auth.currentUser.uid,
            name: userInfo.name,
            username: userInfo.username
          })
          setUser(userResponse)
          setRegisterError('')
          history.push('/feed')
        })
        .catch((err) => {
          // TODO: Provide feedback in UI if an error occurs
          setRegisterError(err.message)
        })
    }
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
