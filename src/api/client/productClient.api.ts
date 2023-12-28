import { createAsyncThunk } from '@reduxjs/toolkit'
import { Cart, ShowCart } from 'types/cart.type'
import { Category } from 'types/category.type'
import { Favourite } from 'types/favourite.type'
import { Product } from 'types/product.type'
import { Size } from 'types/size.type'
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

export const searchProductClient = createAsyncThunk('product/searchProductClient', async (name: string, thunkAPI) => {
  try {
    const response = await http<{ product: Product[] }>({
      url: `product/client/search`,
      method: 'PATCH',
      data: { name },
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const showCartClient = createAsyncThunk('product/showCartClient', async (listCart: ShowCart[], thunkAPI) => {
  try {
    const response = await http<{ sumPrice: number; listCart: Cart[] }>({
      url: `product/client/show-cart`,
      method: 'POST',
      data: { listCart },
      signal: thunkAPI.signal
    })
    return response.data
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
})

export const showDetailProduct = createAsyncThunk(
  'product/showDetailProduct',
  async ({ nameCategory, productId }: { nameCategory: string; productId: number }, thunkAPI) => {
    try {
      const response = await http.get<{
        category: Category
        product: Product
        productGroup: Product[]
        listSize: any[]
        productList: Product[]
      }>(`product/client/get-detailproduct/${nameCategory}/${productId}`, {
        signal: thunkAPI.signal
      })
      console.log(response.data)
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const addFavouriteProduct = createAsyncThunk(
  'product/addFavouriteProduct',
  async ({ productGroupId }: { productGroupId: number }, thunkAPI) => {
    try {
      const response = await http<{ favourite: boolean }>({
        url: `favourite/client/add-favourite`,
        method: 'PATCH',
        data: { productGroupId },
        signal: thunkAPI.signal
      })
      return response.data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const showFavouriteProduct = createAsyncThunk(
  'product/showFavouriteProduct',
  async ({ productGroupId }: { productGroupId: number }, thunkAPI) => {
    const response = await http<{ favourite: boolean }>({
      url: `favourite/client/show-favourite/${productGroupId}`,
      method: 'GET',
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const showFavouriteProductList = createAsyncThunk('product/showFavouriteProductList', async (_, thunkAPI) => {
  const response = await http<{ productList: Product[] }>({
    url: `product/client/show-productFavourite`,
    method: 'GET',
    signal: thunkAPI.signal
  })
  return response.data
})

export const showCategoryAndSizeAndMinMaxPrice = createAsyncThunk(
  'product/showCategoryAndSizeAndMinMaxPrice',
  async (_, thunkAPI) => {
    const response = await http<{ category: Category[]; size: any[]; minPrice: number; maxPrice: number }>({
      url: `product/client/get-categoryandsize`,
      method: 'GET',
      signal: thunkAPI.signal
    })
    return response.data
  }
)

export const showFilterProduct = createAsyncThunk(
  'product/showFilterProduct',
  async (
    {
      category,
      gender,
      size,
      priceMin,
      priceMax
    }: { category: number | 0; size: number | 0; gender: number | 0; priceMin: number; priceMax: number },
    thunkAPI
  ) => {
    const response = await http<{ products: Product[] }>({
      url: `product/client/get-filterProduct`,
      method: 'POST',
      data: {
        category,
        gender,
        size,
        priceMin,
        priceMax
      },
      signal: thunkAPI.signal
    })
    return response.data
  }
)
