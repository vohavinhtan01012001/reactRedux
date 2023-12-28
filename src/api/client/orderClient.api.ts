import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserPayment } from 'types/auth.type'
import { CartPayment } from 'types/cart.type'
import { Order, OrderItem } from 'types/order.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const paymentCod = createAsyncThunk(
  'order/paymentCod',
  async ({ user, cart }: { user: UserPayment; cart: CartPayment[] }, thunkAPI) => {
    try {
      const response = await http<{ status: Status }>({
        url: `order/client/order-cod`,
        method: 'POST',
        data: { user, cart },
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const paymentVnpay = createAsyncThunk(
  'order/paymentVnpay',
  async ({ user, cart }: { user: UserPayment; cart: CartPayment[] }, thunkAPI) => {
    try {
      const response = await http<{ status: Status }>({
        url: `order/client/order-vnpay`,
        method: 'POST',
        data: { /* user,  */ cart },
        signal: thunkAPI.signal
      })
      console.log(response.data)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const paymentVnpayCheck = createAsyncThunk(
  'order/paymentVnpayCheck',
  async ({ user, cart, vnp_Params }: { user: UserPayment; cart: CartPayment[]; vnp_Params: any }, thunkAPI) => {
    try {
      const response = await http<{ status: Status }>({
        url: `order/client/vnpay-check`,
        method: 'POST',
        data: { user, cart, vnp_Params },
        signal: thunkAPI.signal
      })
      console.log(response.data)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const showOrderOfUser = createAsyncThunk('order/showOrderOfUser', async (_, thunkAPI) => {
  try {
    const response = await http<{ user: User; orders: Order[] }>({
      url: `order/client/show-order`,
      method: 'GET',
      signal: thunkAPI.signal
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const showOrderItemOfOrder = createAsyncThunk('order/showOrderItemOfOrder', async (id: number, thunkAPI) => {
  try {
    const response = await http<{ orders: OrderItem[] }>({
      url: `order/client/show-orderItem/${id}`,
      method: 'GET',
      signal: thunkAPI.signal
    })
    console.log(response.data)
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
