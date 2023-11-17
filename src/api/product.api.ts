import { createAsyncThunk } from '@reduxjs/toolkit'
import { CreateProduct, Product } from 'types/product.type'
import { Status } from 'types/status.type'
import http from 'utils/http'
import { EdittingProduct } from '../types/product.type'

export const getProductList = createAsyncThunk('product/getProductList', async (_, thunkAPI) => {
  const response = await http.get<{ status: string; product: Product[] }>('product/get-all', {
    signal: thunkAPI.signal
  })
  return response.data
})

export const addProduct = createAsyncThunk('product/addProduct', async (data: any, thunkAPI) => {
  try {
    const response = await http<{ status: Status; product: Product }>({
      url: 'product/add-product',
      method: 'POST',
      data: data, // Không thực hiện chuyển đổi kiểu dữ liệu ở đây
      headers: { 'Content-Type': 'multipart/form-data' },
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }

  // Convert dữ liệu ra json

  // Nếu bị lỗi thì reject
  /* if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(jsonData)
  } */

  // Còn không thì trả về dữ liệu
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (productId: number, thunkAPI) => {
  try {
    const response = await http.delete<Status>(`product/delete/${productId}`, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const showIdProduct = createAsyncThunk('product/showIdProduct', async (productId: number, thunkAPI) => {
  try {
    const response = await http.get<{ status: Status; product: EdittingProduct }>(`product/showById/${productId}`, {
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ product, productId }: { product: any; productId: number }, thunkAPI) => {
    try {
      const response = await http<{ status: Status; product: EdittingProduct }>({
        url: `product/update-product/${productId}`,
        method: 'PATCH',
        data: product,
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: thunkAPI.signal
      })
      console.log(response)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
