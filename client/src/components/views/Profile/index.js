import React from 'react'

export const Profile = () => {

  // TODO: Remove hard code and receive a USER prop and then display accordingly

  return (<main class="view-profile-container flex flex--column flex--align-center flex--justify-center">
    <h3 class="section-heading">View Profile</h3>
    <div class="profile-container flex flex--column flex--align-center flex--justify-around">
      <h4 id="name" class="profile-title">Nick Ray</h4>
      <h6 class="profile-field-heading">Bio</h6>
      <p id="bio" class="profile-field">Just a guy that likes to make websites and play music</p>
      <h6 class="profile-field-heading">Location</h6>
      <p id="location" class="profile-field">STL, MO</p>
      <h6 class="profile-field-heading">Genres</h6>
      <p id="genres" class="profile-field">Rock, Blues, Metal</p>
      <h6 class="profile-field-heading">Instruments</h6>
      <p id="instruments" class="profile-field">Guitar, Bass, Drums</p>
    </div>
  </main>)
}
