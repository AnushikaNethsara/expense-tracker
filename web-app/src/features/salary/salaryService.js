import axios from 'axios'

const API_URL = "http://localhost:5000/api/salary";

const createSalary = async (salaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, salaryData, config)

  return response.data
}

const getSalary = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const salaryService = {
  createSalary,
  getSalary
}

export default salaryService
