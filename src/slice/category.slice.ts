import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category } from 'types/category.type'
import { addCategory, deleteCategory, getCategoryList, updateCategory } from '../api/category.api'
import { toast } from 'react-toastify'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface CategoryState {
  categoryList: Category[]
  status: Status
  edittingCategory: Category | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: CategoryState = {
  categoryList: [],
  status: {
    statusCode: 0,
    message: ''
  },
  edittingCategory: null,
  loading: false,
  currentRequestId: undefined
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    showEditCategory: (state, action) => {
      const categoryId = action.payload
      const foundEdit = state.categoryList.find((c) => c.id === categoryId)
      if (foundEdit) {
        state.edittingCategory = foundEdit
      }
    },
    cancelCategory: (state) => {
      state.edittingCategory = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.categoryList = action.payload.category
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoryList.push(action.payload.category)
        state.status = action.payload.status
        toast.success('Category updated successfully!', {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const foundIndex = state.categoryList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.categoryList.splice(foundIndex, 1)
        }
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoryList.push(action.payload.category)
        state.status = action.payload.status
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
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
          console.log(action)
        }
      )
  }
})

export const { showEditCategory, cancelCategory } = categorySlice.actions

const categoryReducer = categorySlice.reducer
export default categoryReducer
