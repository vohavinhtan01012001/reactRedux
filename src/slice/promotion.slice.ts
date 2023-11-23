import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addPromotion,
  deletePromotion,
  getPromotionList,
  updatePromotion,
  updateStatusPromotion
} from 'api/promotion.api'
import { toast } from 'react-toastify'
import { Promotion } from 'types/promotion.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface PromotionState {
  promotionList: Promotion[]
  status: Status
  edittingPromotion: Promotion | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: PromotionState = {
  promotionList: [],
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
      .addCase(addPromotion.rejected, (state, action: any) => {
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
      .addCase(updateStatusPromotion.fulfilled, (state, action) => {
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(updateStatusPromotion.rejected, (state, action: any) => {
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
      .addCase(updatePromotion.rejected, (state, action: any) => {
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
      .addCase(deletePromotion.fulfilled, (state, action) => {
        const foundIndex = state.promotionList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.promotionList.splice(foundIndex, 1)
        }
        toast.success(action.payload.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(deletePromotion.rejected, (state, action: any) => {
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
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
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
export const { showEditPromotion, cancelModal } = promotionSlice.actions

const promotionReducer = promotionSlice.reducer
export default promotionReducer
