import axios from 'axios'

const editProfile = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(process.env.REACT_APP_API_URL +"users/" + id, userData, config)

  return response.data
}

const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(process.env.REACT_APP_API_URL + "users/" + id, config)
  return response.data
}

const userService = {
  editProfile,
  getUserById
}

export default userService
