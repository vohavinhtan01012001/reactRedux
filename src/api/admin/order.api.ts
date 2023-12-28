import { createAsyncThunk } from '@reduxjs/toolkit'
import { Order, OrderItem } from 'types/order.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const getOrderList = createAsyncThunk('order/getOrderList', async (_, thunkAPI) => {
  const response = await http.get<{ orders: Order[] }>('order/get-all', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const getOrderListStatus = createAsyncThunk('order/getOrderListStatus', async (status: number, thunkAPI) => {
  const response = await http.get<{ orders: Order[] }>(`order/get-status/${status}`, {
    signal: thunkAPI.signal
  })
  return response.data
})

export const getDetailOrder = createAsyncThunk('order/getDetailOrder', async (id: number, thunkAPI) => {
  const response = await http.get<{ order: Order; orderItem: OrderItem[] }>(`/order/get-by/${id}`, {
    signal: thunkAPI.signal
  })
  console.log(response.data)
  return response.data
})

export const updateStatusOrder = createAsyncThunk(
  'order/updateStatusOrder',
  async ({ status, id }: { status: any; id: number }, thunkAPI) => {
    try {
      const response = await http<{ status: Status }>({
        url: `order/update-status/${id}`,
        method: 'PATCH',
        data: { status },
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateDeliveryOrder = createAsyncThunk(
  'order/updateDeliveryOrder',
  async ({ delivery, id }: { delivery: number; id: number }, thunkAPI) => {
    try {
      const response = await http<{ status: Status }>({
        url: `order/update-delivery/${id}`,
        method: 'PATCH',
        data: { delivery },
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
