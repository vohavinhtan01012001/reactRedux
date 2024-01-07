import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  paymentCod,
  paymentVnpay,
  paymentVnpayCheck,
  showOrderItemOfOrder,
  showOrderOfUser
} from 'api/client/orderClient.api'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { User } from 'types/auth.type'
import { Order, OrderItem } from 'types/order.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface OrderClientState {
  order: Order[]
  user: User
  orderItem: OrderItem[]
  status: Status | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: OrderClientState = {
  status: null,
  loading: false,
  orderItem: [],
  currentRequestId: undefined,
  order: [],
  user: {
    id: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  }
}

const orderClientSlice = createSlice({
  name: 'orderClient',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(paymentCod.fulfilled, (state, action) => {
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
        Cookies.remove('cart')
      })
      .addCase(paymentVnpay.fulfilled, (state, action) => {
        const updatedDataJSON = JSON.stringify(action.meta.arg.user)
        Cookies.set('user', updatedDataJSON, { expires: 7 })
      })
      .addCase(paymentVnpayCheck.fulfilled, (state, action) => {
        Cookies.remove('cart')
        Cookies.remove('user')
      })
      .addCase(showOrderOfUser.fulfilled, (state, action) => {
        state.order = action.payload.orders
        state.user = action.payload.user
      })
      .addCase(showOrderItemOfOrder.fulfilled, (state, action) => {
        state.orderItem = action.payload.orders
      })
  }
})
export const {} = orderClientSlice.actions
const orderClientReducer = orderClientSlice.reducer
export default orderClientReducer
