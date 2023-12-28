import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from 'types/auth.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const getUserClient = createAsyncThunk('user/getUserClient', async (_, thunkAPI) => {
  try {
    const response = await http.get<{ user: User }>('user', {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
