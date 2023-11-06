import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginResponse, User, UserLogin } from 'types/auth.type'
import { Status } from 'types/status.type'
import http from 'utils/http'
import { login, register, registerAdmin } from './auth.api'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const expirationString = '2023-10-26T03:58:06Z'

interface UserState {
  userList: User[]
  useLogin: UserLogin
  loginResponse: LoginResponse
  loading: boolean
  currentRequestId: undefined | string
  statusUser: Status
}

const expirationDate = new Date(expirationString)

const year = expirationDate.getUTCFullYear()
const month = (expirationDate.getUTCMonth() + 1).toString().padStart(2, '0')
const day = expirationDate.getUTCDate().toString().padStart(2, '0')
const hours = expirationDate.getUTCHours().toString().padStart(2, '0')
const minutes = expirationDate.getUTCMinutes().toString().padStart(2, '0')
const seconds = expirationDate.getUTCSeconds().toString().padStart(2, '0')

const formattedExpiration = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

const initialState: UserState = {
  userList: [],
  useLogin: {
    email: '',
    password: ''
  },
  loginResponse: {
    /* token: '',
    refreshToken: '',
    expiration: formattedExpiration,
    name: '',
    username: '',
    statusCode: 0,
    message: '' */
    user: {},
    accessToken: '',
    statusCode: 0,
    message: ''
  },
  loading: false,
  currentRequestId: undefined,
  statusUser: {
    statusCode: 0,
    message: ''
  }
}

interface ErrorResponse {
  code: number
  message: string
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.statusUser = action.payload
        if (action.payload.statusCode === 1) {
          toast.success(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
        console.log(action.payload)
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginResponse = action.payload
        console.log(action.payload)
        console.log(state.loginResponse)
        if (action.payload.statusCode === 1) {
          toast.success(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.statusUser = action.payload
      })
    /* .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
           state.loading = true
           state.currentRequestId = action.meta.requestId
        }
      ) */
    /*  .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
             state.loading = false
            state.currentRequestId = undefined
          }
        }
      ) */
  }
})

/* export const {} = userSlice.actions */

const userReducer = userSlice.reducer
export default userReducer
