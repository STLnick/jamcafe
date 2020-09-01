import React from 'react'
import { Link } from 'react-router-dom'

export const Hero = () => {

  return (
    <section
      className="section--hero flex flex--column flex--justify-end flex--align-center"
    >
      <p className="hero-text">Find someone to jam with.</p>
      <p className="hero-text">Find someone for your band.</p>
      <p className="hero-text">Find a band to join.</p>
      <p className="hero-text hero-text-last">Find people to play music with.</p>
      <Link
        className="cta-btn hero-btn"
        to="/register"
      >
        Join to Jam
      </Link>
    </section>
  )
}
