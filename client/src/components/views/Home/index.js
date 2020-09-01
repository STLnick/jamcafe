import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Section } from '../../base'
import { Hero } from './Hero'
import { TestimonialsSection } from './TestimonialsSection'

export const Home = () => {

  const sections = [
    {
      heading: 'Our Goal',
      images: null,
      list: null,
      text: [
        `Here at Jam Cafe we don't dream of being a rockstar. We dream of helping musicians
          connect to try and be rockstars or just jam buddies.`,
        `We get it`,
        `There's no better feeling than playing music with others.`
      ],
      title: null
    },
    {
      heading: 'How We Can Help',
      images: null,
      list: [
        {
          image: {
            alt: '',
            className: 'feature-list-item--marker',
            src: 'img/icons/electric-guitar.svg'
          },
          text: 'Search for other Musicians'
        },
        {
          image: {
            alt: '',
            className: 'feature-list-item--marker',
            src: 'img/icons/note_01.svg'
          },
          text: 'See availability to jam'
        },
        {
          image: {
            alt: '',
            className: 'feature-list-item--marker',
            src: 'img/icons/reel-to-reel-tape-recorder.svg'
          },
          text: 'Post open jam events'
        },
        {
          image: {
            alt: '',
            className: 'feature-list-item--marker',
            src: 'img/icons/vinyl-record.svg'
          },
          text: 'Post band openings'
        },
        {
          image: {
            alt: '',
            className: 'feature-list-item--marker',
            src: 'img/icons/audio-cable.svg'
          },
          text: 'Message musicians to connect'
        }
      ],
      listClass: '',
      listItemClass: 'feature-list-item flex',
      text: null,
      title: 'features'
    },
    {
      heading: 'How To Start Jamming',
      images: null,
      // Need to get images to include for each li
      // showing use of app
      list: [
        {
          image: {
            alt: '',
            className: 'use-img',
            src: 'img/icons/add-circle-sharp.svg'
          },
          text: 'Search for other Musicians'
        },
        {
          image: {
            alt: '',
            className: 'use-img',
            src: 'img/icons/add-circle-sharp.svg'
          },
          text: 'Check out profiles to see who fits'
        },
        {
          image: {
            alt: '',
            className: 'use-img',
            src: 'img/icons/add-circle-sharp.svg'
          },
          text: 'Send a message to connect'
        }
      ],
      listClass: 'use-list',
      listItemClass: '',
      text: null,
      title: 'use'
    },
    {
      button: <div className="flex flex--column flex--justify-center flex--align-center"><Link className="cta-btn bottom-cta-btn" to='/register'>Join to Jam</Link></div>,
      heading: 'Let Us Help You',
      images: null,
      list: null,
      listClass: null,
      listItemClass: null,
      text: [
        `It's a struggle as a working musician, no doubt. We can help make
        one part of that easier by connecting you with like-minded
        musicians for your band.`,
        `It's tough if you don't want to be in a band but just play some
        music too! Especially if you and ALL of your buddies play one
        instrument... yeesh. We can open the door to others who just
        want to play for fun.`,
        `Don't play alone!`
      ],
      title: 'help'
    }
  ]

  const reviews = [
    {
      className: 'testimonial-1',
      image: {
        src: "img/testimonial-1.jpg",
        className: "testimonial-1-img",
        alt: ""
      },
      quote: `I love using Jam Cafe. It's a place I know I can come to when
        I want to just jam or if I end up wanting to join a band!`,
      user: 'User 1'
    },
    {
      className: 'testimonial-2',
      image: {
        src: "img/testimonial-2.jpeg",
        className: "testimonial-2-img",
        alt: ""
      },
      quote: `Jam Cafe made it so easy for me to find new people to play with.
        All I did was search for a few local people and we got together
        and had an awesome time!`,
      user: 'User 1'
    },
    {
      className: 'testimonial-3',
      image: {
        src: "img/testimonial-3.jpg",
        className: "testimonial-3-img",
        alt: ""
      },
      quote: `I love playing music and that's why I'm in a band. Jam Cafe
        made it easy for me to find a quick replacement for my band
        when a member parted ways. Love it!`,
      user: 'User 1'
    }
  ]

  return (
    <Fragment>
      <Hero />
      <Section section={sections[0]} />
      <div>
        <img
          className="partition-img"
          src="img/instruments.jpg"
          alt="People's hands holding up instruments"
        />
      </div>
      <Section section={sections[1]} />
      <Section section={sections[2]} />
      <TestimonialsSection reviews={reviews} />
      <Section section={sections[3]} />
    </Fragment>
  )
}
