import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Form = ({ btn, formBtm, inputs }) => {

  const renderLabeledInputs = () => {
    return inputs.map(({ htmlFor, id, placeholder, type }) => {
      return (
        <Fragment key={id}>
          <label htmlFor={htmlFor} className="screen-reader-text">{placeholder}</label>
          <input type={type} className="input" id={id} placeholder={placeholder} />
        </Fragment>
      )
    })
  }

  return (
    <form className="register-form flex flex--column flex--align-center flex--justify-evenly">
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
