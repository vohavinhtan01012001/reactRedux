import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getDetailOrder,
  getOrderList,
  getOrderListStatus,
  updateDeliveryOrder,
  updateStatusOrder
} from 'api/admin/order.api'
import { paymentCod } from 'api/client/orderClient.api'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { Order, OrderItem } from 'types/order.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface OrderState {
  status: Status | null
  orderList: Order[]
  orderStatus: number | null
  orderDelivery: number | null
  order: Order | null
  orderItemList: OrderItem[]
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: OrderState = {
  status: null,
  orderList: [],
  orderStatus: null,
  orderDelivery: null,
  order: null,
  orderItemList: [],
  loading: false,
  currentRequestId: undefined
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    /*    showGetOrderListStatus: (state, action) => {
      const status: number = action.payload.value
      state.orderList = action.payload.orders.filter((order: any) => {
        return order.status == status
      })
    } */
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload.orders
      })
      .addCase(getOrderListStatus.fulfilled, (state, action) => {
        state.orderList = action.payload.orders
      })
      .addCase(getDetailOrder.fulfilled, (state, action) => {
        state.order = action.payload.order
        state.orderItemList = action.payload.orderItem
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.orderStatus = action.meta.arg.status
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(updateDeliveryOrder.fulfilled, (state, action) => {
        state.orderDelivery = action.meta.arg.delivery

        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
  }
})
export const {} = orderSlice.actions
const orderReducer = orderSlice.reducer
export default orderReducer
