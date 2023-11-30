import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'types/category.type'
import http from 'utils/http'

export const getCategoryList = createAsyncThunk('categoryClient/getCategoryList', async (_, thunkAPI) => {
  const response = await http.get<{ category: Category[] }>('category/client/get-all', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const getCategoryById = createAsyncThunk('categoryClient/getCategoryById', async (id:number, thunkAPI) => {
  const response = await http.get<{ category: Category }>(`category/client/get-byid/:${id}`, {
    signal: thunkAPI.signal
  })
  return response.data
})
