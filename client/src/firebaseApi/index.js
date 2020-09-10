
import dotenv from 'dotenv'

dotenv.config()

export default {
  async addAdminRole(userEmail) {
    const res = await fetch(process.env.REACT_APP_ADMIN_ADD_ADMIN_ROLE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ userEmail })
    })
    return res.text()
  },
  async deleteUser(uid) {
    const res = await fetch(process.env.REACT_APP_ADMIN_DELETE_USER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ uid })
    })
    return res.text()
  },
}
