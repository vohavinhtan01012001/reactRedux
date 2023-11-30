import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategoryById, getCategoryList } from 'api/client/categoryClient.api'
import { Category } from 'types/category.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface CategoryState {
  categoryList: Category[]
  status: Status
  category: Category | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: CategoryState = {
  categoryList: [],
  category: null,
  status: {
    statusCode: 0,
    message: ''
  },
  loading: false,
  currentRequestId: undefined
}

const categoryClientSlice = createSlice({
  name: 'categoryClient',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.categoryList = action.payload.category
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.category = action.payload.category
      })
  }
})

const categoryClientReducer = categoryClientSlice.reducer
export default categoryClientReducer
