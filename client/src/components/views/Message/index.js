import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'

import api from 'api'

import './Message.scss'

const chatsAPI = api('chats')

// Testing render of chat clips showing other username
const activeUser = 'stlnick'

export const Message = () => {
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [newMessageText, setNewMessageText] = useState('')
  const [yourId, setYourId] = useState()
  const socketRef = useRef()

  // TODO: Redirect to login if no user in context (no one logged in)

  // TODO: Get User from Context and use to retrieve all chats for that users
  useEffect(() => {
    (async () => {
      const chatsRes = await chatsAPI.showOne('stlnick')
      setChats(chatsRes)
      setActiveChat(chatsRes[0])
    })()

    socketRef.current = io.connect('http://localhost:5000')

    socketRef.current.on('your id', id => {
      setYourId(id)
    })

    socketRef.current.on('message', message => {
      receivedMessage(message)
    })
  }, [])

  const handleChatChange = (e) => {
    const clickedChat = e.target.closest('div')
    setActiveChat(chats.find(chat => chat._id === clickedChat.dataset.chatid))

    // TODO: Need to get new socket id???
  }

  const handleNewMessageTextChange = (e) => {
    setNewMessageText(e.target.value)
  }

  const handleSendMessage = async () => {
    const newMsg = {
      from: activeUser,
      msg: newMessageText,
      to: activeChat.users[0] === activeUser ? activeChat.users[1] : activeChat.users[0]
    }
    console.log(activeChat)

    socketRef.current.emit('send message', { ...newMsg, chatId: activeChat._id })

    try {
      await chatsAPI.update({ _id: activeChat._id, message: newMsg })
    } catch (err) {
      // TODO: Provide feedback on UI on error
      console.log(err)
    }

    setNewMessageText('')
  }

  const handleStartNewChat = async (e) => {
    // TODO: Provide a search functionality to find a user by username
    e.preventDefault()

    const userToChatWith = e.target.elements[0].value
    const newChat = {
      users: [activeUser, userToChatWith],
      messages: []
    }

    let hasExistingChat = false
    chats.forEach(chat => {
      if (chat.users.includes(activeUser && userToChatWith)) {
        hasExistingChat = true
      }
    })

    if (hasExistingChat) {
      // TODO: Provide feedback on UI
      console.log('You already have a chat with them!')
    } else {
      try {
        const newChatRes = await chatsAPI.create(newChat)
        newChat._id = newChatRes.insertedId

        setChats(prevChats => ([
          ...prevChats,
          newChat
        ]))
        // TODO: Change activeChat to the newly created chat for UX
      } catch (err) {
        // TODO: Provide feedback on UI
        console.log(err)
      }
    }

  }

  const receivedMessage = ({ chatId, ...newMsg }) => {
    setActiveChat(prevChat => ({
      ...prevChat,
      'messages': [
        ...prevChat['messages'],
        newMsg
      ]
    }))

    setChats(prevChats => prevChats.map(chat => {
      if (chat._id === chatId) {
        return {
          ...chat,
          'messages': [
            ...chat['messages'],
            newMsg
          ]
        }
      } else {
        return chat
      }
    }))
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
    <div className="start-chat-container">
      <form
        className="start-chat-form"
        onSubmit={e => handleStartNewChat(e)}
      >
        <input type="text" className="my-input" />
        <button type="submit">Start Chat</button>
      </form>
    </div>
  </main>)
}
