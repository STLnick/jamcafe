const baseUrl = 'http://localhost:5000'

export default (resource) => ({
  // Add a new Post OR User
  async create(payload) {
    const res = await fetch(`${baseUrl}/${resource}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    return await res.json()
  },

  // Delete a Post OR User
  async delete(payload) {
    await fetch(`${baseUrl}/${resource}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  },

  // Get all Posts OR Users
  async show() {
    const res = await fetch(`${baseUrl}/${resource}`)
    return await res.json()
  },

  // Get one User OR Posts for one User
  async showOne(username) {
    const res = await fetch(`${baseUrl}/${resource}/${username}`)
    return await res.json()
  },

  // Update a User OR Post
  async update(payload) {
    const { _id, uid, ...propsToUpdate } = payload
    await fetch(`${baseUrl}/${resource}/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(propsToUpdate)
    })
  },

  // Get user info after Firebase authentication
  async verify(payload) {
    const loginRes = await fetch(`${baseUrl}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    return await loginRes.json()
  },

});
