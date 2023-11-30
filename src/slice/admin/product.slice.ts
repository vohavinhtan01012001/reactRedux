import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { addCategory } from 'api/admin/category.api'
import {
  addProduct,
  deleteProduct,
  getProductList,
  searchProduct,
  showIdProduct,
  updateProduct,
  updateStatusProduct
} from 'api/admin/product.api'
import { toast } from 'react-toastify'
import { EdittingProduct, Product } from 'types/product.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
interface ProductState {
  productList: Product[]
  status: Status | null
  edittingProduct: EdittingProduct | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: ProductState = {
  productList: [],
  status: null,
  edittingProduct: null,
  loading: false,
  currentRequestId: undefined
}
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductList.fulfilled, (state, action) => {
        state.productList = action.payload.product
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload.product)
        state.status = action.payload.status
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(addCategory.rejected, (state, action: any) => {
        if (action.payload.error) {
          toast.error(action.payload.error, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const foundIndex = state.productList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.productList.splice(foundIndex, 1)
        }
        toast.success(action.payload.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(deleteProduct.rejected, (state, action: any) => {
        if (action.payload.error) {
          toast.error(action.payload.error, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .addCase(showIdProduct.fulfilled, (state, action) => {
        state.edittingProduct = action.payload.product
        console.log(action.payload.product)
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(updateStatusProduct.fulfilled, (state, action) => {
        /* const foundIndex = state.productList.findIndex((c) => c.id === action.meta.arg.productId)
        if (foundIndex !== -1) {
          state.productList[foundIndex].status = action.meta.arg.status
        } */
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(updateStatusProduct.rejected, (state, action: any) => {
        if (action.payload.error) {
          toast.error(action.payload.error, {
            position: toast.POSITION.TOP_RIGHT
          })
        } else {
          toast.error(action.payload.message, {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.productList = action.payload.product
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending') && action.type !== updateStatusProduct.pending.type,
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

const productReducer = productSlice.reducer
export default productReducer
