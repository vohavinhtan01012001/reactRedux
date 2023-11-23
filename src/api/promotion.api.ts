import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreatePromotion, Promotion, UpdatePromotion } from 'types/promotion.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const getPromotionList = createAsyncThunk('promotion/getProductList', async (_, thunkAPI) => {
  const response = await http.get<{ status: string; promotion: Promotion[] }>('promotion/get-all', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const addPromotion = createAsyncThunk('promotion/addPromotion', async (data: CreatePromotion, thunkAPI) => {
  try {
    const response = await http<{ status: Status; promotion: Promotion }>({
      url: 'promotion/add-promotion',
      method: 'POST',
      data: data,
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const updateStatusPromotion = createAsyncThunk(
  'promotion/updateStatusPromotion',
  async ({ status, promotionId }: { status: any; promotionId: number }, thunkAPI) => {
    try {
      const response = await http<{ status: Status }>({
        url: `promotion/update-status/${promotionId}`,
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

export const updatePromotion = createAsyncThunk(
  'promotion/updatePromotion',
  async ({ promotion, promotionId }: { promotion: UpdatePromotion; promotionId: number }, thunkAPI) => {
    try {
      console.log({ ...promotion })
      const response = await http<{ status: Status; promotion: Promotion }>({
        url: `promotion/update-promotion/${promotionId}`,
        method: 'PATCH',
        data: { ...promotion },
        signal: thunkAPI.signal
      })
      console.log(response.data)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deletePromotion = createAsyncThunk('promotion/deletePromotion', async (promoitonId: number, thunkAPI) => {
  try {
    const response = await http.delete<Status>(`promotion/delete/${promoitonId}`, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})