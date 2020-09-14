import React, { useReduce, useState } from 'react';

import './Message.scss'

/*
  Just

  chats = [
    {chat}, {chat}, {chat}
  ]

  chat = {
    _id: xxxxxx,
    users: [user1, user2]
    messages: [
      {msg}, {msg}, {msg}
    ]
  }

  msg = {
    from: 'user1',
    to: 'user2',
    msg: 'A message here'
  }
*/

// Testing Chats
const tempChats = [
  {
    _id: '54321',
    users: ['user1', 'user2'],
    messages: [
      { from: 'user1', to: 'user2', msg: 'hey there' },
      { from: 'user2', to: 'user1', msg: 'how are you' },
      { from: 'user1', to: 'user2', msg: 'I\'m good' },
    ]
  },
  {
    _id: '54321',
    users: ['user1', 'user3'],
    messages: [
      { from: 'user1', to: 'user3', msg: 'hey there' },
      { from: 'user3', to: 'user1', msg: 'how are you' },
      { from: 'user1', to: 'user3', msg: 'I\'m good' },
    ]
  },
  {
    _id: '54321',
    users: ['user2', 'user3'],
    messages: [
      { from: 'user3', to: 'user2', msg: 'hey there' },
      { from: 'user2', to: 'user3', msg: 'how are you' },
      { from: 'user3', to: 'user2', msg: 'I\'m good' },
    ]
  },
]

// Testing render of chat clips showing other username
const activeUser = 'user1'

export const Message = () => {
  const [chats, setChats] = useState(tempChats)

  const renderChats = () => chats.map(chat => <div className="chat-clip flex flex--align-center mb-4">
    <img className="avatar mr-3" src="img/avatar.jpg" alt="User Avatar" />
    <h2>{chat.users[0] === activeUser ? chat.users[1] : chat.users[0]}</h2>
  </div>)

  return (<main className="write-post-container flex flex--column flex--align-center">
    <h3 id="message-heading" className="section-heading">Send A Message</h3>
    <div className="post flex flex--column flex--align-center">
      <div className="top-chat flex">
        <div className="users-window">
          UsersWindow
          {renderChats()}
        </div>
        <div className="chat-window">ChatWindow</div>
      </div>
      <div className="chat-box flex flex--justify-between">
        <div className="message">Enter Message here...</div>
        <button className="cta-btn">Send</button>
      </div>
    </div>
  </main>)
}
