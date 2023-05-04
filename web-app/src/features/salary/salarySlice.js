import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import salaryService from './salaryService'

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  salary: 0
}

export const createSalary = createAsyncThunk(
  'salary/create',
  async (salaryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const userId = thunkAPI.getState().auth.user._id
      salaryData.userId = userId;
      return await salaryService.createSalary(salaryData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const getSalary = createAsyncThunk(
  'salary',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await salaryService.getSalary(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const salarySlice = createSlice({
  name: 'salary',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSalary.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSalary.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.salary = action.payload.salary
      })
      .addCase(createSalary.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //salary
      .addCase(getSalary.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSalary.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.salary = action.payload.salary
      })
      .addCase(getSalary.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = salarySlice.actions
export default salarySlice.reducer
