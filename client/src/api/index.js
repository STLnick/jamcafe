export default (baseUrl = 'http://localhost:5000') => ({
  // Get posts and append the usernames to each
  async getAllPosts() {
    const postRes = await fetch(`${baseUrl}/posts`, {
      contentType: 'application/json'
    })
    return await postRes.json()
  }
});
