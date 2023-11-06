import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'types/shirt.type'
import http from 'utils/http'

export const addCategory = createAsyncThunk('category/addCategory', async ({ body }: { body: Category }, thunkAPI) => {
  const response = await http.post<{ status: string; category: Category }>('category/add-category', body, {
    signal: thunkAPI.signal
  })
  return response.data
})

export const getCategoryList = createAsyncThunk('category/getCategoryList', async (_, thunkAPI) => {
  const response = await http.get<{ status: string; category: Category[] }>('category/get-all', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ body }: { body: Category }, thunkAPI) => {
    try {
      const response = await http.patch<Category>(`category/update-category`, body, {
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (categoryId: number, thunkAPI) => {
  const response = await http.delete<{ status: {} }>(`category/${categoryId}`, {
    signal: thunkAPI.signal
  })
  return response.data
})
