import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addProductInPromotion,
  addPromotion,
  deleteProductInPromotion,
  deletePromotion,
  getListAddProduct,
  getListShowListProduct,
  getPromotionList,
  searchPromotion,
  updatePromotion,
  updateStatusPromotion
} from 'api/admin/promotion.api'
import { toast } from 'react-toastify'
import { Product } from 'types/product.type'
import { Promotion } from 'types/promotion.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface PromotionState {
  promotionList: Promotion[]
  productListOfPromotion: Product[]
  status: Status
  edittingPromotion: Promotion | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: PromotionState = {
  promotionList: [],
  productListOfPromotion: [],
  status: {
    statusCode: 0,
    message: ''
  },
  edittingPromotion: null,
  loading: false,
  currentRequestId: undefined
}

const promotionSlice = createSlice({
  name: 'promotion',
  initialState: initialState,
  reducers: {
    showEditPromotion: (state, action) => {
      const promotionId = action.payload
      const foundEdit = state.promotionList.find((promotion) => promotion.id === promotionId)
      if (foundEdit) {
        state.edittingPromotion = foundEdit
      }
    },
    cancelModal: (state) => {
      state.edittingPromotion = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPromotionList.fulfilled, (state, action) => {
        state.promotionList = action.payload.promotion
      })
      .addCase(addPromotion.fulfilled, (state, action) => {
        state.promotionList.push(action.payload.promotion)
        state.status = action.payload.status
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(updateStatusPromotion.fulfilled, (state, action) => {
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(updatePromotion.fulfilled, (state, action) => {
        const { promotion, status } = action.payload
        const updatePromotionIndex = state.promotionList.findIndex((c) => c.id === promotion.id)
        if (updatePromotionIndex !== -1) {
          state.promotionList[updatePromotionIndex] = promotion
        }
        toast.success(status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(deletePromotion.fulfilled, (state, action) => {
        const foundIndex = state.promotionList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.promotionList.splice(foundIndex, 1)
        }
        toast.success(action.payload.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(getListAddProduct.fulfilled, (state, action) => {
        if (action.payload.product.length > 0) {
          state.productListOfPromotion = action.payload.product
        } else {
          toast.warning('empty product list', {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
      .addCase(addProductInPromotion.fulfilled, (state, action) => {
        state.productListOfPromotion = action.payload.product
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(getListShowListProduct.fulfilled, (state, action) => {
        state.productListOfPromotion = action.payload.product
      })
      .addCase(deleteProductInPromotion.fulfilled, (state, action) => {
        const foundIndex = state.productListOfPromotion.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.productListOfPromotion.splice(foundIndex, 1)
        }
        toast.success(action.payload.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(deleteProductInPromotion.rejected, (state, action: any) => {
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
      .addCase(searchPromotion.fulfilled, (state, action) => {
        state.promotionList = action.payload.promotion
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction>(
        (action) => action.type.endsWith('/rejected'),
        (state, action: any) => {
          if (action.payload.message) {
            toast.error(action.payload.message, {
              position: toast.POSITION.TOP_RIGHT
            })
          }
          if (action.payload.errorMsg) {
            toast.error(action.payload.errorMsg, {
              position: toast.POSITION.TOP_RIGHT
            })
          }

          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addMatcher<FulfilledAction>(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action: any) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})
export const { showEditPromotion, cancelModal } = promotionSlice.actions

const promotionReducer = promotionSlice.reducer
export default promotionReducer
