import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

const linkVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.0,
      duration: 1.5
    }
  }
}

export const Hero = () => {

  return (
    <section
      className="section--hero flex flex--column flex--justify-end flex--align-center"
    >
      <p className="hero-text">Find someone to jam with.</p>
      <p className="hero-text">Find someone for your band.</p>
      <p className="hero-text">Find a band to join.</p>
      <p className="hero-text hero-text-last">Find people to play music with.</p>
      <motion.div
        initial="hidden"
        animate="visible"
        className="hero-btn mt-6"
        variants={linkVariants}
      >
        <Link
          className="cta-btn hero-btn"
          to="/register"
        >
          Join to Jam
        </Link>
      </motion.div>
    </section>
  )
}
