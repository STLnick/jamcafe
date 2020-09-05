import React from 'react';
import { useLocation } from 'react-router-dom'

export const Message = () => {
  const location = useLocation()

  const recipient = location.search.slice(1)

  return (<main className="write-post-container flex flex--column flex--align-center">
    <h3 id="message-heading" className="section-heading">Send A Message</h3>
    <div className="post flex flex--column flex--align-center">
      <p className="message-recipient">Sending to: <strong>{recipient}</strong></p>
      <label htmlFor="title" className="message-title">Message Title</label>
      <input
        type="text"
        id="title"
        className="my-input title-input"
        placeholder="Title here..."
      />

      <div className="message-content flex flex--column flex--align-center flex--justify-center">
        <label htmlFor="message">Type Message Below</label>
        <textarea
          id="message"
          cols="30"
          rows="10"
          placeholder="Message content here...">
        </textarea>
      </div>

      <div className="post-footer flex flex--align-center flex--justify-between">
        <p className="post--date"></p>
        {/* TODO: Make button actually send a message to specified User */}
        {/* Need an onClick handler to send message */}
        <button className="send-msg-btn">
          <img
            tabIndex="0"
            src="img/icons/checkmark-circle.svg"
            className="send-message-icon filter-primary"
            alt="Checkmark icon to send a message" />
        </button>
      </div>
    </div>
  </main>)
}
