import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category, CreateCategory } from 'types/category.type'
import { Status } from 'types/status.type'
import http from 'utils/http'

export const addCategory = createAsyncThunk('category/addCategory', async (category: CreateCategory, thunkAPI) => {
  const response = await http.post<{ status: Status; category: Category }>('category/add-category', category, {
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

export const updateCategory = createAsyncThunk('category/updateCategory', async (category: Category, thunkAPI) => {
  try {
    const response = await http.patch<{ status: Status; category: Category }>(
      `category/update-category/${category.id}`,
      category,
      {
        signal: thunkAPI.signal
      }
    )
    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError' && error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
    throw error
  }
})

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (categoryId: number, thunkAPI) => {
  const response = await http.delete<{ status: Status }>(`category/delete/${categoryId}`, {
    signal: thunkAPI.signal
  })
  return response.data
})
