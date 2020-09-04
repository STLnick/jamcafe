import React from 'react'

export const CreatePost = () => {
  return (<main class="write-post-container flex flex--column flex--align-center">
    <h3 id="write-post-heading" class="section-heading">Write A Post</h3>
    <div class="post flex flex--column flex--align-center">
      <label for="title-input" class="screen-reader-text">Title</label>
      <input type="text" id="title-input" class="my-input title-input" placeholder="Title here..." />
      <a class="post--username" href="#">
        {/* TODO: Place the User's name writing the Post here */}
        <p class="">User Name</p>
      </a>
      <div class="post--content">
        <label htmlFor="post--content-input" className="screen-reader-text">Post Content</label>
        <textarea name="post--content-input" id="post--content-input" placeholder="Post content here..."></textarea>
      </div>
      <div class="post-footer flex flex--align-center flex--justify-between">
        {/* TODO: Dynamically get Date and place here */}
        <p class="post--date">30 July 2020</p>
        <img tabindex="0" class="post--message-icon filter-primary" src="img/icons/chatbox-ellipses.svg" alt="" />
      </div>
    </div>
  </main>)
}
