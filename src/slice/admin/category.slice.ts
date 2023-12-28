import { AsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Category } from 'types/category.type'
import { addCategory, deleteCategory, getCategoryList, updateCategory } from '../../api/admin/category.api'
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
        const { category, status } = action.payload
        const updatedCategoryIndex = state.categoryList.findIndex((item) => item.id === category.id)

        if (updatedCategoryIndex !== -1) {
          state.categoryList[updatedCategoryIndex] = category
        }
        state.status = status
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(updateCategory.rejected, (state, action: any) => {
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
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const foundIndex = state.categoryList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.categoryList.splice(foundIndex, 1)
        }
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(deleteCategory.rejected, (state, action: any) => {
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
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoryList.push(action.payload.category)
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
  }
})

export const { showEditCategory, cancelCategory } = categorySlice.actions

const categoryReducer = categorySlice.reducer
export default categoryReducer
