import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getListProductOfCategory, getProductListPageHome } from 'api/client/productClient.api'
import { Category } from 'types/category.type'
import { Product } from 'types/product.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface ProductClientState {
  productList: Product[]
  category: Category | null
  status: Status | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: ProductClientState = {
  productList: [],
  category: null,
  status: null,
  loading: false,
  currentRequestId: undefined
}

const productClientSlice = createSlice({
  name: 'productClient',
  initialState,
  reducers: {
    showProductList: (state, action) => {
      console.log(action.payload)
      if (action.payload == 1) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.price
          const right = b.price
          return left === right ? 0 : left > right ? 1 : -1
        })
        return { ...state, productList: sortedProducts }
      } else if (action.payload == 2) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.price
          const right = b.price
          return left === right ? 0 : left < right ? 1 : -1
        })
        console.log(sortedProducts)
        return { ...state, productList: sortedProducts }
      } else if (action.payload == 3) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.name.toLowerCase()
          const right = b.name.toLowerCase()
          return left.localeCompare(right)
        })
        console.log(sortedProducts)
        return { ...state, productList: sortedProducts }
      } else if (action.payload == 4) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.name.toLowerCase()
          const right = b.name.toLowerCase()
          return right.localeCompare(left)
        })
        console.log(sortedProducts)
        return { ...state, productList: sortedProducts }
      }
      return state
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getProductListPageHome.fulfilled, (state, action) => {
        state.productList = action.payload.product
      })
      .addCase(getListProductOfCategory.fulfilled, (state, action) => {
        state.productList = action.payload.product
        state.category = action.payload.category
      })
  }
})
export const { showProductList } = productClientSlice.actions
const productClientReducer = productClientSlice.reducer
export default productClientReducer
