export default (baseUrl = 'http://localhost:5000') => ({
  // Get posts and append the usernames to each
  async getAllPosts() {
    const postsRes = await fetch(`${baseUrl}/posts`, {
      contentType: 'application/json'
    })
    return await postsRes.json()
  },

  async getUserPosts() {
    const postsRes = await fetch(`${baseUrl}/posts`, {
      contentType: 'application/json'
    })
    return await postsRes.json()
  },

  async registerUser(userInfo) {
    const registerRes = await fetch(`${baseUrl}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    })
    return await registerRes.text()
  }
});
