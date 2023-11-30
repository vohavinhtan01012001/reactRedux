import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from 'types/category.type'
import { Product } from 'types/product.type'
import http from 'utils/http'

export const getProductListPageHome = createAsyncThunk('productClient/getProductListPageHome', async (_, thunkAPI) => {
  const response = await http.get<{ product: Product[] }>('product/client/get-home', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const getListProductOfCategory = createAsyncThunk(
  'productClient/getListProductOfCategory',
  async (id: number, thunkAPI) => {
    const response = await http.get<{ product: Product[]; category: Category }>(`product/client/get-collection/${id}`, {
      signal: thunkAPI.signal
    })
    return response.data
  }
)
