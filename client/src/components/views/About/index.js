import React from 'react'

import { Section } from '../../components'

const section = {
  heading: 'About Us',
  images: {
    alt: 'Band playing in a basement',
    src: 'img/low-key-band.jpg',
    className: 'about-img'
  },
  text: [
    `We absolutely love music here at Jam Cafe.`,
    `It's a big reason we do what we do. There has been so many times as individuals where just playing with some friends is the greatest feeling in the world. There's been many more times when that wasn't a possibility for a number of reasons. `,
    `What drives us is trying to help others get that amazing feeling as much and as easily as possible. The biggest issue we ran into as individuals was not having anyone to play with. Maybe you moved to a new town, maybe your buddies moved to a new town - whatever. We do what we do so others can get that problem taken care of as easily as possible. `,
    `Go ahead. Jam out.`
  ],
  title: null
}

export const About = () => {
  return (
    <Section section={section} />
  )
}
