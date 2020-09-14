import { motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'

import api from 'api'
import { UserContext } from 'UserContext'

import './Message.scss'

const chatsAPI = api('chats')

const wrapperVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.25,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

const headerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1
    }
  },
  exit: {
    opacity: 0,
    x: '-100vw',
    transition: { ease: 'easeInOut' }
  }
}

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
}

export const Message = () => {
  const history = useHistory()
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [newMessageText, setNewMessageText] = useState('')
  const socketRef = useRef()
  const { user } = useContext(UserContext)

  if (!user) {
    history.push('/login')
  }

  // TODO: Get User from Context and use to retrieve all chats for that users
  useEffect(() => {
    let isSubscribed = true;

    (async () => {
      if (isSubscribed) {
        const chatsRes = await chatsAPI.showOne(user?.username)
        setChats(chatsRes)
        setActiveChat(chatsRes[0])
      }
    })()

    socketRef.current = io.connect('http://localhost:5000')

    socketRef.current.on('message', message => {
      if (isSubscribed) {
        receivedMessage(message)
      }
    })
    return () => isSubscribed = false
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
      from: user?.username,
      msg: newMessageText,
      to: activeChat.users[0] === user?.username ? activeChat.users[1] : activeChat.users[0]
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
      users: [user?.username, userToChatWith],
      messages: []
    }

    let hasExistingChat = false
    chats.forEach(chat => {
      if (chat.users.includes(user?.username && userToChatWith)) {
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
      <h2>{chat.users[0] === user?.username ? chat.users[1] : chat.users[0]}</h2>
    </div>
  })

  const renderActiveChat = () => {
    return activeChat
      ? activeChat.messages.map((msg, i) => {
        const msgClass = msg.from === user?.username ? 'sent-message' : 'received-message'
        return msg.from === user?.username
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

  return (<motion.main
    className="write-post-container flex flex--column flex--align-center"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={wrapperVariants}
  >
    <motion.h3
      id="message-heading"
      className="section-heading"
      variants={headerVariants}
    >
      Send A Message
    </motion.h3>
    <motion.div
      className="post flex flex--column flex--align-center"
      variants={containerVariants}
    >
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
    </motion.div>
    <div className="start-chat-container">
      <form
        className="start-chat-form"
        onSubmit={e => handleStartNewChat(e)}
      >
        <input type="text" className="my-input" placeholder="Username to chat with..." />
        <button type="submit">Start Chat</button>
      </form>
    </div>
  </motion.main>)
}
