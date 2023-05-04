import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import expenseSlice from '../features/expenses/expenseSlice'
import salarySlice from '../features/salary/salarySlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseSlice,
    salary: salarySlice,
    user: userReducer
  },
})
