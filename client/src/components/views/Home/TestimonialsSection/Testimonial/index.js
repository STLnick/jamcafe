import React from 'react'
import PropTypes from 'prop-types'

import './Testimonial.scss'

export const Testimonial = ({ review: { className, image, quote, user } }) => {
  return (
    <div className={`testimonial ${className}`} key={className}>
      <img
        alt={image.alt}
        src={image.src}
        className={image.className}
      />
      <blockquote>
        <p className="is-size-4">{quote}</p>
        <footer className="is-size-4">{user}</footer>
      </blockquote>
    </div>
  )
}

Testimonial.propTypes = {
  review: PropTypes.object
}
