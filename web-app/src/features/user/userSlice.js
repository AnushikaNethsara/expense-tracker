import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'
import { toast } from 'react-toastify';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  profile: {}
}

export const editProfile = createAsyncThunk(
  'user/update',
  async (profileData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const id = thunkAPI.getState().auth.user._id
      return await userService.editProfile(id, profileData, token)
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


export const getUserById = createAsyncThunk(
  'user',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const id = thunkAPI.getState().auth.user._id
      return await userService.getUserById(id, token)
    } catch (error) {
      console.log(error);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    //edit profile
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
        console.log(action.payload);
        toast.success("Successfully Updated")
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //get profile
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer
