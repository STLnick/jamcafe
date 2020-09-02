import React from 'react'

export const EditProfile = () => {

  // TODO: Send in a User Object to populate values of inputs

  return (<main class="edit-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 class="section-heading">Edit Profile</h3>
    <form class="edit-profile-form flex flex--column flex--align-center flex--justify-around">
      <label for="name" class="screen-reader-text">Name</label>
      <input id="name" type="text" class="my-input" placeholder="Name" />
      <label for="bio" class="screen-reader-text">About Me</label>
      <textarea id="bio" class="my-input" placeholder="About Me"></textarea>
      <label for="location" class="screen-reader-text">Location</label>
      <input id="location" type="text" class="my-input" placeholder="Location (St Louis, MO)" />
      <label for="genres" class="screen-reader-text">Genres</label>
      <input id="genres" type="text" class="my-input" placeholder="Genres you play (Rock, Blues, Metal)" />
      <label for="instruments" class="screen-reader-text">Instruments</label>
      <input id="instruments" type="text" class="my-input" placeholder="Instruments (Guitar, Bass, Drums)" />
      <button class="cancel-btn">Cancel</button>
      <button class="cta-btn" type="submit">Confirm</button>
    </form>
  </main>)
}
