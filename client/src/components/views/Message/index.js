import React from 'react';

export const Message = () => {
  return (<main className="write-post-container flex flex--column flex--align-center">
    <h3 id="message-heading" className="section-heading">Send A Message</h3>
    <div className="post flex flex--column flex--align-center">
      <label for="title" className="write-heading">Message Title</label>
      <input
        type="text"
        id="title"
        className="my-input title-input"
        placeholder="Title here..."
      />
      {/* WHY did I have this as a link tag? */}
      <a className="post--username" id="message-recipient" href="#">
        {/* TODO: Place the User's name who were sending the message to */}
        <p className="">Sending to: (User Name)</p>
      </a>
      <div className="post--content flex flex--column flex--align-center flex--justify-center">
        <label for="message">Type Message Below</label>
        <textarea
          id="message"
          className="message-input input"
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
