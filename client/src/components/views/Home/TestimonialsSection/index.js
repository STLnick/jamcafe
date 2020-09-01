import React from 'react'
import PropTypes from 'prop-types'

import { Testimonial } from './Testimonial'

export const TestimonialsSection = ({ reviews }) => {

  const renderReviews = () => {
    return reviews.map(review => {
      return (
        <Testimonial key={review.className} review={review} />
      )
    })
  }

  return (
    <section className="section section--testimonials">
      <h3 className="section-heading">Hear From Our Users</h3>
      {renderReviews()}
    </section>
  )
}

TestimonialsSection.propTypes = {
  reviews: PropTypes.array
}
