import axios from 'axios'

const API_URL = "http://localhost:5000/api/users/";

const editProfile = async (id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + id, userData, config)

  return response.data
}

const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + id, config)
  return response.data
}

const userService = {
  editProfile,
  getUserById
}

export default userService
