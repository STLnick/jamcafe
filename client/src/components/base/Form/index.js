import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import api from 'api'

const repo = api()

export const Form = ({ btn, formBtm, inputs }) => {

  const handleSubmit = async () => {
    // TODO: get info from fields
    const userInfo = 'something.....'

    // make post request to server to create new user
    try {
      await repo.registerUser(userInfo)
    } catch (err) {
      throw new Error(err)
    }

    // TODO: redirect the user to login?home?editProfile?
  }

  const renderLabeledInputs = () => {
    return inputs.map(({ htmlFor, id, placeholder, type }) => {
      return (
        <Fragment key={id}>
          <label htmlFor={htmlFor} className="screen-reader-text">{placeholder}</label>
          <input type={type} className="my-input" id={id} placeholder={placeholder} />
        </Fragment>
      )
    })
  }

  return (
    <form
      className="register-form flex flex--column flex--align-center flex--justify-evenly"
      onSubmit={handleSubmit}
    >
      {renderLabeledInputs()}
      {btn}
      {formBtm}
    </form>
  )
}

Form.propTypes = {
  btn: PropTypes.object,
  formBtm: PropTypes.object,
  inputs: PropTypes.array
}
