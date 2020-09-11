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
      delay: 1.25,
      duration: 1.5
    }
  }
}

const textContainerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.3
    }
  }
}

const textVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export const Hero = () => {

  return (
    <section
      className="section--hero flex flex--column flex--justify-end flex--align-center"
    >
      <motion.div
        className="hero-text-container"
        initial="hidden"
        animate="visible"
        variants={textContainerVariants}
      >
        <motion.p
          className="hero-text"
          variants={textVariants}
        >
          Find someone to jam with.
        </motion.p>
        <motion.p
          className="hero-text"
          variants={textVariants}
        >
          Find someone for your band.
        </motion.p>
        <motion.p
          className="hero-text"
          variants={textVariants}
        >
          Find a band to join.
        </motion.p>
        <motion.p
          className="hero-text hero-text-last"
          variants={textVariants}
        >
          Find people to play music with.
        </motion.p>
      </motion.div>
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
