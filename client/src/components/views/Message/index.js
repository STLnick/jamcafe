import { motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal'
import { useHistory, useLocation } from 'react-router-dom'
import io from 'socket.io-client'

import api from 'api'
import { UserContext } from 'UserContext'

import './Message.scss'
import { ReactComponent as MessageIcon } from '../../../assets/chatbox-ellipses.svg'


const chatsAPI = api('chats')
const usersAPI = api('users')

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
  const location = useLocation()
  const [chats, setChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [newChatText, setNewChatText] = useState('')
  const [newMessageText, setNewMessageText] = useState('')
  const [users, setUsers] = useState([])
  const socketRef = useRef()
  const { user } = useContext(UserContext)

  if (!user) {
    history.push('/login')
  }

  useEffect(() => {
    let isSubscribed = true;

    // Set chats and activeChat if a user is present from context
    if (user) {
      const { username } = user;
      const userToMsg = location.state ? location.state.userToMsg : null;

      (async () => {
        if (isSubscribed) {
          const chatsRes = await chatsAPI.showOne(username)
          setUsers(await usersAPI.show())

          let existingChat = null
          chatsRes.forEach(chat => {
            if (chat.users.includes(username && userToMsg)) {
              existingChat = chat
            }
          })

          if (existingChat) {
            setActiveChat(existingChat)
            setChats(() => chatsRes)
          } else {
            if (userToMsg) {
              const newChat = {
                users: [username, userToMsg],
                messages: []
              }

              const newChatRes = await chatsAPI.create(newChat)
              newChat._id = newChatRes.insertedId

              setActiveChat(newChat)
              setChats(() => ([
                ...chatsRes,
                newChat
              ]))

            } else {
              setActiveChat(chatsRes[0])
              setChats(() => chatsRes)
            }
          }
        }
      })()

      // Setup socket connection and event
      socketRef.current = io.connect('http://localhost:5000')
      socketRef.current.on('message', message => {
        if (isSubscribed) {
          receivedMessage(message)
        }
      })
    }

    // Unsubscribe
    return () => isSubscribed = false
  }, [user])

  const handleChatChange = (e) => {
    const clickedChat = e.target.closest('div')
    setActiveChat(chats.find(chat => chat._id === clickedChat.dataset.chatid))
  }

  const populateMatchedUsers = () => {
    const usersDiv = document.querySelector('.start-chat-users')
    usersDiv.innerHTML = <ul className="start-chat-users-list">
      {users.filter(({ username }) => username.toLowerCase() === newChatText.toLowerCase()).map(({ username }) => <li>{username}</li>)}
    </ul>
  }

  const handleNewChatTextChange = (e) => {
    setNewChatText(e.target.value)
    // TODO: Populate start-chat-users div with usernames that match input
    populateMatchedUsers()
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

    const userToChatWith = newChatText
    const newChat = {
      users: [user?.username, userToChatWith],
      messages: []
    }

    let existingChat = null
    chats.forEach(chat => {
      if (chat.users.includes(user?.username && userToChatWith)) {
        existingChat = chat
      }
    })

    if (existingChat) {
      setActiveChat(existingChat)
      setNewChatText('')
    } else {
      try {
        const newChatRes = await chatsAPI.create(newChat)
        newChat._id = newChatRes.insertedId

        setChats(prevChats => ([
          ...prevChats,
          newChat
        ]))
        // TODO: Change activeChat to the newly created chat for UX

        setNewChatText('')
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
    const activeClass = chat._id === activeChat?._id ? 'active-chat' : null
    return <div
      className={`chat-clip flex flex--align-center mb-4 ${activeClass}`}
      onClick={e => handleChatChange(e)}
      data-chatid={chat._id}
      key={chat._id}
    >
      <MessageIcon className="message-icon filter-primary" />
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
      className="post chat-container flex flex--column flex--align-center"
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
      <div className="chat-box flex flex--align-center flex--justify-between">
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
      <button
        className="cta-btn small-btn start-chat-btn"
        onClick={() => setModalIsOpen(true)}
      >
        Start A Chat
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            height: '550px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '250px',
          }
        }}
      >
        <form
          className="start-chat-form flex flex--column flex--align-center flex--justify-around"
          onSubmit={e => handleStartNewChat(e)}
        >
          <input
            className="my-input"
            onChange={e => handleNewChatTextChange(e)}
            placeholder="Username to chat with..."
            type="text"
            value={newChatText}
          />
          <div className="start-chat-users"></div>
          <button
            className="cancel-btn small-btn start-chat-btn"
            onClick={() => setModalIsOpen(false)}
          >
            Cancel
          </button>
          <button className="cta-btn small-btn start-chat-btn" type="submit">Start Chat</button>
        </form>
      </Modal>
    </div>
  </motion.main>)
}
