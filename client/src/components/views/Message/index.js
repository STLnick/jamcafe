import React, { useEffect, useReducer, useState } from 'react';

import api from 'api'

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
    _id: '111',
    users: ['user1', 'user2'],
    messages: [
      { from: 'user1', to: 'user2', msg: 'hey there' },
      { from: 'user2', to: 'user1', msg: 'how are you' },
      { from: 'user1', to: 'user2', msg: 'I\'m good' },
    ]
  },
  {
    _id: '222',
    users: ['user1', 'user3'],
    messages: [
      { from: 'user1', to: 'user3', msg: 'hey ' },
      { from: 'user3', to: 'user1', msg: 'whaddup' },
      { from: 'user1', to: 'user3', msg: 'I\'m good' },
    ]
  },
  {
    _id: '333',
    users: ['user4', 'user1'],
    messages: [
      { from: 'user4', to: 'user1', msg: 'yoyoyo' },
      { from: 'user1', to: 'user4', msg: 'lol' },
      { from: 'user4', to: 'user1', msg: 'lolz' },
    ]
  },
]

const chatsAPI = api('chats')
// Will use:
// update() -- adding a new message to existing chat
// showOne() -- get all chats for a user
// create() -- create a new chat between two users

// Testing render of chat clips showing other username
const activeUser = 'user1'

export const Message = () => {
  const [chats, setChats] = useState(tempChats)
  const [activeChat, setActiveChat] = useState(chats[0])
  const [newMessageText, setNewMessageText] = useState('')

  // TODO: Get User from Context and use to retrieve all chats for that users

  useEffect(() => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        return chat._id === activeChat._id ? activeChat : chat
      })
    })

    // TODO: setChats with retrieved chats from Mongo
  }, [activeChat.messages])

  const handleChatChange = (e) => {
    const clickedChat = e.target.closest('div')
    setActiveChat(chats.find(chat => chat._id === clickedChat.dataset.chatid))

    // TODO: Need to get new socket id???
  }

  const handleNewMessageTextChange = (e) => {
    setNewMessageText(e.target.value)
  }

  const handleSendMessage = () => {
    setActiveChat(prevChat => ({
      ...prevChat,
      'messages': [
        ...prevChat['messages'],
        {
          from: activeUser,
          msg: newMessageText,
          to: activeChat.users[0] === activeUser ? activeChat.users[1] : activeChat.users[0]
        }
      ]
    }))

    // TODO: Store message in Mongo

    // TODO: Emit socket.io event to send to other user live

    setNewMessageText('')
  }

  const renderChats = () => chats.map(chat => {
    return <div
      className="chat-clip flex flex--align-center mb-4"
      onClick={e => handleChatChange(e)}
      data-chatid={chat._id}
      key={chat._id}
    >
      <img className="avatar mr-3" src="img/avatar.jpg" alt="User Avatar" />
      <h2>{chat.users[0] === activeUser ? chat.users[1] : chat.users[0]}</h2>
    </div>
  })

  const renderActiveChat = () => {
    return activeChat
      ? activeChat.messages.map((msg, i) => {
        const msgClass = msg.from === activeUser ? 'sent-message' : 'received-message'
        return msg.from === activeUser
          ? <div className={`message ${msgClass} flex flex--align-center`} key={i}>
            <p className="user-message">{msg.msg}</p>
            <p className="user-clip">{msg.from}</p>
          </div>
          : <div className={`message ${msgClass} flex flex--align-center`} key={i}>
            <p className="user-clip">{msg.from}</p>
            <p className="user-message">{msg.msg}</p>
          </div>
      })
      : null
  }

  return (<main className="write-post-container flex flex--column flex--align-center">
    <h3 id="message-heading" className="section-heading">Send A Message</h3>
    <div className="post flex flex--column flex--align-center">
      <div className="top-chat flex">
        <div className="users-window">
          {renderChats()}
        </div>
        <div className="chat-window">
          {renderActiveChat()}
        </div>
      </div>
      <div className="chat-box flex flex--justify-between">
        <input
          className="my-input new-message"
          onChange={e => handleNewMessageTextChange(e)}
          value={newMessageText}
        />
        <button
          className="cta-btn"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  </main>)
}
