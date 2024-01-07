import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginResponse, User, UserLogin, UserRegister } from 'types/auth.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const register = createAsyncThunk('auth/register', async (user: UserRegister, thunkAPI) => {
  try {
    const response = await http.post<Status>('Authorization/register', user, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const login = createAsyncThunk('auth/login', async (body: UserLogin, thunkAPI) => {
  try {
    const response = await http.post<LoginResponse>('Authorization/login', body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const registerAdmin = createAsyncThunk('auth/registerAdmin', async ({ body }: { body: User }, thunkAPI) => {
  try {
    const response = await http.post<LoginResponse>('Authorization/registerAdmin', body, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const checkAdmin = createAsyncThunk('auth/checkAdmin', async (_, thunkAPI) => {
  /* try { */
  const response = await http.get<Status>('Authorization/check-admin', {
    signal: thunkAPI.signal
  })
  console.log(response.data)
  return response.data
  /*   } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  } */
})
