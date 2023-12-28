import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateSize, Size } from 'types/size.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const addSize = createAsyncThunk('size/addSize', async (size: CreateSize, thunkAPI) => {
  try {
    const response = await http.post<{ status: Status; size: Size }>('size/add-size', size, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const getSizeList = createAsyncThunk('size/getSizeList', async (_, thunkAPI) => {
  const response = await http.get<{ status: string; sizes: Size[] }>('size/get-all', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const deleteSize = createAsyncThunk('size/deleteSize', async (categoryId: number, thunkAPI) => {
  try {
    const response = await http.delete<{ status: Status }>(`size/delete/${categoryId}`, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})
