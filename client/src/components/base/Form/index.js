import { motion } from 'framer-motion'
import React from 'react'
import PropTypes from 'prop-types'

const formVariants = {
  hidden: {
    x: '100vw'
  },
  visible: {
    x: 0,
    transition: {
      delay: 0.1,
      duration: 1.25,
      when: "beforeChildren",
      staggerChildren: 0.3,
    }
  }
}

const fieldVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.75
    }
  }
}

export const Form = ({ btn, errorMsg, formBtm, handler, inputs }) => {
  const renderLabeledInputs = () => {
    return inputs.map(({ htmlFor, id, placeholder, type }) => {
      return (
        <motion.div key={id} variants={fieldVariants}>
          <label htmlFor={htmlFor} className="screen-reader-text">{placeholder}</label>
          <input type={type} className="my-input" id={id} placeholder={placeholder} />
        </motion.div>
      )
    })
  }

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      className="my-form flex flex--column flex--align-center flex--justify-evenly"
      onSubmit={(e) => handler(e)}
      variants={formVariants}
    >
      {renderLabeledInputs()}
      {btn}
      {errorMsg
        ? (<p className="is-size-4 has-text-danger has-text-centered">{errorMsg}</p>)
        : null}
      {formBtm}
    </motion.form>
  )
}

Form.propTypes = {
  btn: PropTypes.object,
  errorMsg: PropTypes.string,
  formBtm: PropTypes.object,
  handler: PropTypes.func,
  inputs: PropTypes.array
}

Form.defaultProps = {
  errorMsg: ''
}
