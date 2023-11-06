import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category } from 'types/shirt.type'
import { addCategory, deleteCategory, getCategoryList, updateCategory } from './adminCategory.api'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface CategoryState {
  categoryList: Category[]
  status: {}
  edittingCategory: Category | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: CategoryState = {
  categoryList: [],
  status: {},
  edittingCategory: null,
  loading: false,
  currentRequestId: undefined
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    showEditCategory: (state, action: PayloadAction<number>) => {
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
        state.categoryList.find((category, index) => {
          if (category.id === action.meta.arg.body.id) {
            state.categoryList[index] = action.meta.arg.body
            return true
          }
          return false
        })
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const foundIndex = state.categoryList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.categoryList.splice(foundIndex, 1)
        }
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoryList.push(action.payload.category)
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

export const { showEditCategory, cancelCategory } = categorySlice.actions

const categoryReducer = categorySlice.reducer
export default categoryReducer
