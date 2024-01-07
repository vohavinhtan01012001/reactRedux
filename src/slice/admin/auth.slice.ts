import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { LoginResponse, User, UserLogin } from 'types/auth.type'
import { ErrorResponse, Status } from 'types/status.type'
import http from 'utils/http'
import { checkAdmin, login, register, registerAdmin } from '../../api/admin/auth.api'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

const expirationString = '2023-10-26T03:58:06Z'

interface UserState {
  userList: User[]
  useLogin: UserLogin
  checkAdmin: boolean
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
  checkAdmin: false,
  useLogin: {
    username: '',
    password: ''
  },
  loginResponse: {
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
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginResponse = action.payload
        if (action.payload.statusCode === 1) {
          toast.success(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
          Cookies.set('accessToken', action.payload.accessToken, { expires: 7 })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.statusUser = action.payload
      })
      /* .addCase(login.rejected, (state, action: any) => {
        console.log(action.payload)
        if (action.payload.error) {
          toast.error(action.payload.error, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      }) */
      .addCase(register.rejected, (state, action: any) => {
        console.log(action.payload)
        if (action.payload.error) {
          toast.error(action.payload.error, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .addCase(checkAdmin.fulfilled, (state, action: any) => {
        state.checkAdmin = true
      })
      .addCase(checkAdmin.rejected, (state, action: any) => {
        state.checkAdmin = false
      })
     /*  .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
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
