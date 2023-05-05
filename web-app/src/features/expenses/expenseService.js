import axios from 'axios'

const API_URL = "http://localhost:5000/api/";

const createExpense = async (expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + "expenses", expenseData, config)

  return response.data
}

const getExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "expenses", config)
  return response.data
}

const getArchivedExpenses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "expenses/archived", config)
  return response.data
}

const deleteExpense = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + "expenses/" + id, config)

  return response.data
}

const updateExpense = async (id, expenseData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + "expenses/" + id, expenseData, config)
  return response.data
}

const expenseService = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getArchivedExpenses
}

export default expenseService
