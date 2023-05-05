import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import expenseService from './expenseService'

const initialState = {
  expenses: [],
  archivedExpenses:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  totalExpenses: 0
}

export const createExpense = createAsyncThunk(
  'expenses/create',
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await expenseService.createExpense(expenseData, token)
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

export const getExpenses = createAsyncThunk(
  'expenses/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await expenseService.getExpenses(token)
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

export const archiveExpense = createAsyncThunk(
  'expenses/archiveExpense',
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await expenseService.updateExpense(expenseData._id, expenseData, token)
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

export const unArchiveExpense = createAsyncThunk(
  'expenses/unArchiveExpense',
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await expenseService.updateExpense(expenseData._id, expenseData, token)
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


export const getArchivedExpenses = createAsyncThunk(
  'expenses/archivedExpenses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await expenseService.getArchivedExpenses(token)
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

export const deleteExpense = createAsyncThunk(
  'expenses/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await expenseService.deleteExpense(id, token)
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

export const updateExpense = createAsyncThunk(
  'expenses/update',
  async (expenseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await expenseService.updateExpense(expenseData._id, expenseData, token)
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


export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //expense
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.expenses.push(action.payload)
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //get expenses
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.expenses = action.payload
        const totalAmounts = state.expenses
          .filter(expense => !expense.archived)
          .map(expense => expense.totalAmount);
        const sumTotalAmounts = totalAmounts.reduce((acc, curr) => acc + curr, 0);
        state.totalExpenses = sumTotalAmounts
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // delete expenses
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload.id
        )
        const totalAmounts = state.expenses.map(expense => expense.totalAmount);
        const sumTotalAmounts = totalAmounts.reduce((acc, curr) => acc + curr, 0);
        state.totalExpenses = sumTotalAmounts
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // update expense
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        let idToUpdate = state.expenses.findIndex(expense => expense._id === action.payload._id);
        state.expenses[idToUpdate] = action.payload
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // get archived expenses
      .addCase(getArchivedExpenses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getArchivedExpenses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.archivedExpenses = action.payload
      })
      .addCase(getArchivedExpenses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // archive expense
      .addCase(archiveExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(archiveExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload._id
        )
        const totalAmounts = state.expenses.map(expense => expense.totalAmount);
        const sumTotalAmounts = totalAmounts.reduce((acc, curr) => acc + curr, 0);
        state.totalExpenses = sumTotalAmounts
      })
      .addCase(archiveExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // unarchive expense
      .addCase(unArchiveExpense.pending, (state) => {
        state.isLoading = true
      })
      .addCase(unArchiveExpense.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.archivedExpenses = state.archivedExpenses.filter(
          (expense) => expense._id !== action.payload._id
        )
      })
      .addCase(unArchiveExpense.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = expenseSlice.actions
export default expenseSlice.reducer
