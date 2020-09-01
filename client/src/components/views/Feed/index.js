import React from 'react'

import { Card } from '../../components'

export const Feed = () => {

  // TODO: Will need to fetch posts from database, store and then render
  const posts = [
    {
      title: `Looking for a Drummer`,
      user: `GuyWithoutADrummer`,
      content: `Hey y'all! My drummer just moved outta town and I'm in need of a new stick wielder! We play mainly Rock and Blues. Hit me up if interested`,
      date: `30 July 2020`
    },
    {
      title: `I Wanna Jam`,
      user: `drummerdude`,
      content: `What's up guys? I'm a drummer, obviously by my name, and I play Metal, Rock, and Jazz. Lemme know if you wanna meet up and get some tunes flowin.`,
      date: `3 August 2020`
    },
    {
      title: `Show Coming Up`,
      user: `MusicianFaReal`,
      content: `BIG NEWS! Our band The Jammers, formed fully here on Jam Cafe, is having our first show in the city this Friday!!! Doors @ 7 and Show @ 8. 21 and Up Only! Come see us! You won't regret it.`,
      date: `10 August 2020`
    },
    {
      title: `Reggae Jam Anybody?`,
      user: `BrassMan`,
      content: `I love playing my Trumpet to some smooth Reggae jams and I'm looking to get a couple people together to do just that. I have a buddy who plays Guitar but we could always use another plus a Drummer and HOPEFULLY some other Horn players! Message me if interested.`,
      date: `2 July 2020`
    }
  ]

  const renderPosts = () => {
    return posts.map((post, i) => {
      return <Card key={i} post={post} />
    })
  }

  return (
    <div className="posts flex flex--column flex--align-center flex--justify-evenly">
      <h3 className="section-heading">User Posts</h3>
      {renderPosts()}
    </div>
  )
}
