import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginResponse, User, UserLogin } from 'types/auth.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const register = createAsyncThunk('auth/register', async (user: User, thunkAPI) => {
  try {
    const response = await http.post<Status>('authorization/register', user, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const login = createAsyncThunk('auth/login', async (body: UserLogin, thunkAPI) => {
  try {
    const response = await http.post<LoginResponse>('authorization/login', body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const registerAdmin = createAsyncThunk('auth/registerAdmin', async ({ body }: { body: User }, thunkAPI) => {
  try {
    const response = await http.post<LoginResponse>('authorization/registerAdmin', body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
