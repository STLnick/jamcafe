import React from 'react'
import PropTypes from 'prop-types'

export const Testimonial = ({ review: { className, image, quote, user } }) => {
  return (
    <div className={`testimonial ${className}`} key={className}>
      <img
        alt={image.alt}
        src={image.src}
        className={image.className}
      />
      <blockquote>
        <p>{quote}</p>
        <footer>{user}</footer>
      </blockquote>
    </div>
  )
}

Testimonial.propTypes = {
  review: PropTypes.object
}
