import axios from 'axios'

const createSalary = async (salaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(process.env.REACT_APP_API_URL +"salary", salaryData, config)

  return response.data
}

const getSalary = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(process.env.REACT_APP_API_URL + "salary", config)
  return response.data
}

const salaryService = {
  createSalary,
  getSalary
}

export default salaryService
