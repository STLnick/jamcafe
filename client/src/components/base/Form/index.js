import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export const Form = ({ btn, formBtm, handler, inputs }) => {
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
      onSubmit={(e) => handler(e)}
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
  handler: PropTypes.func,
  inputs: PropTypes.array
}
