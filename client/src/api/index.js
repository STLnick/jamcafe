export default (baseUrl = 'http://localhost:5000') => ({
  // Get all posts
  async getAllPosts() {
    const postsRes = await fetch(`${baseUrl}/posts`, {
      contentType: 'application/json'
    })
    return await postsRes.json()
  },
  // Get posts for one user (viewing profile)
  async getUserPosts() {
    const postsRes = await fetch(`${baseUrl}/posts`, {
      contentType: 'application/json'
    })
    return await postsRes.json()
  },
  // TODO: Actually implement some sort of authorization in state
  // TODO: and encryption of some sort for the password
  // TODO: will need to change the passwords in db to encrypted ones
  async loginUser(userInfo) {
    const loginRes = await fetch(`${baseUrl}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    })

    if (loginRes.status > 200 && loginRes.status < 300) {
      return await loginRes.json()
    } else {
      return await loginRes.text()
    }
  },

  async registerUser(userInfo) {
    const registerRes = await fetch(`${baseUrl}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo)
    })

    if (registerRes.status > 200 && registerRes.status < 300) {
      const { ops } = await registerRes.json()
      console.log(ops)
      return await ops[0]
    } else {
      return await registerRes.text()
    }
  }
});
