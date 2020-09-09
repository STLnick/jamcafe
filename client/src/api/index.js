export default (baseUrl = 'http://localhost:5000') => ({
  async addPost(payload) {
    const postsRes = await fetch(`${baseUrl}/posts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    return await postsRes.json()
  },

  // Delete a post
  async deletePost(payload) {
    console.log('In API: ', payload)
    await fetch(`${baseUrl}/posts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  },

  // Get all posts
  async getAllPosts() {
    const postsRes = await fetch(`${baseUrl}/posts`, {
      contentType: 'application/json'
    })
    return await postsRes.json()
  },

  // Get posts for one user (viewing profile)
  async getUserPosts(uid) {
    const postsRes = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid })
    })
    return await postsRes.json()
  },

  // Delete a user
  async deleteUser(payload) {
    console.log('In API: ', payload)
    await fetch(`${baseUrl}/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  },

  async loginUser(userInfo) {
    const loginRes = await fetch(`${baseUrl}/users`, {
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

  async getAllUsers() {
    const userRes = await fetch(`${baseUrl}/users`)
    return await userRes.json()
  },

  async getUserByUsername(username) {
    const userRes = await fetch(`${baseUrl}/users/${username}`)
    return await userRes.json()
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
      return await ops[0]
    } else {
      return await registerRes.text()
    }
  },

  async updateUser(payload) {
    const { _id, username, uid, ...propsToUpdate } = payload
    await fetch(`${baseUrl}/users/update/${uid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(propsToUpdate)
    })
  }
});
