# JamCafe

A networking Web App for Musicians. ( In Development )

## Purpose

The intent of this app is to provide Musicians an easier way to connect. It gives them one central place to create posts that can be a _Wanted Ad_ for a band member, an open invite to a Jam Session, a concert they have coming up, a concert they're excited to go to, or whatever really.

### Inspiration

The biggest reason this app idea was born and developed was my experience as a Musician. I was never committed or truly desired to be in a band and go through the endless practice hours alone, band practices, and all the travel that occurs. I always enjoyed just playing for fun and some of the best times I've had were just jamming with buddies for no aspirational reason.

One thing I encountered often was only having one, two, maybe three friends at a time that were also musicians _and_ also didn't play the same instrument as me. I can't speak for everyone but a three person jam of all guitarists doesn't sound that great.

This led to me having sparse changes to actually get together with others and play for fun. Some friends were too busy, our schedules didn't coincide at a good time, some left town, etc. It became increasingly harder to get chances to play with others. That's the true reason for JamCafe. Provide people that just love to play for fun a way to connect with other like-minded Musicians. Also, provide a medium for 'dedicated' Musicians to connect with each other of course.

## Tech

Started by using the [Create-React-App](https://github.com/facebook/create-react-app).

This app is built using the MERN stack:

- MongoDB
  - To store the Users and Posts
- Express
  - To simplify the server-side routing sitting on top of Node.js
- React
  - To build the front-end of the app and track the state of the app
- Node
  - To build the server, along with Express, and allow interactions with the database

**Additional**

- React Router
  - To create a seamless UI and navigation between views
- Firebase Auth
  - Creates Users and authorizes them using email and password
  - Removes security risk of storing their email and passwords inside the database

## TODOs

- Deploy it!
  - Will deploy client-side on Netlify
  - Will deploy server-side on Heroku

## Future Features

- Messaging
  - Implement a 'Chat' or 'Messaging' feature to allow Users an easier way to communicate
    - _Possibilities_: TalkJS - Build from scratch

- Refactor `<form>`s
  - Use a library to simplify and streamline the use and management of a `<form>`
    - _Possiblities_: Formik - React-Hook-Form
