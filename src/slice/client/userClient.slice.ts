import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserClient } from 'api/admin/user.api'
import { User } from 'types/auth.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface CategoryClientState {
  user: User
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: CategoryClientState = {
  user: {
    id: 0,
    fullname: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  },
  loading: false,
  currentRequestId: undefined
}

const userClientSlice = createSlice({
  name: 'userClientSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserClient.fulfilled, (state, action) => {
      state.user = action.payload.user
    })
  }
})

export const {} = userClientSlice.actions
const userClientReducer = userClientSlice.reducer
export default userClientReducer
