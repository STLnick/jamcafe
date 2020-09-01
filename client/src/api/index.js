export default (baseUrl = 'http://localhost:5000') => ({
  // Get posts and append the usernames to each
  async getAllPosts() {
    const postRes = await fetch(`${baseUrl}/posts`, {
      contentType: 'application/json'
    })
    return await postRes.json()
  },

  async registerUser(userInfo) {
    const registerRes = await fetch(`${baseUrl}/users/add`, {
      method: 'POST',
      contentType: 'application/json',
      body: JSON.stringify(userInfo)
    })
  }
});
