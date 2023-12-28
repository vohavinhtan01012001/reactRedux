import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { Status } from 'types/status.type'
import { Size } from 'types/size.type'
import { addSize, deleteSize, getSizeList } from '../../api/admin/size.api'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface SizeState {
  sizeList: Size[]
  status: Status
  edittingSize: Size | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: SizeState = {
  sizeList: [],
  status: {
    statusCode: 0,
    message: ''
  },
  edittingSize: null,
  loading: false,
  currentRequestId: undefined
}

const sizeSlice = createSlice({
  name: 'size',
  initialState,
  reducers: {
    showEditSize: (state, action) => {
      const sizeId = action.payload
      const foundEdit = state.sizeList.find((c) => c.id === sizeId)
      if (foundEdit) {
        state.edittingSize = foundEdit
      }
    },
    cancelSize: (state) => {
      state.edittingSize = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getSizeList.fulfilled, (state, action) => {
        state.sizeList = action.payload.sizes
      })
      .addCase(addSize.fulfilled, (state, action) => {
        state.sizeList.push(action.payload.size)
        state.status = action.payload.status
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(addSize.rejected, (state, action: any) => {
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
      .addCase(deleteSize.fulfilled, (state, action) => {
        const foundIndex = state.sizeList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.sizeList.splice(foundIndex, 1)
        }
        toast.success(action.payload.status.message, {
          position: toast.POSITION.TOP_RIGHT
        })
      })
      .addCase(deleteSize.rejected, (state, action: any) => {
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
      /*       .addCase(updateCategory.rejected, (state, action: any) => {
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
        const foundIndex = state.sizeList.findIndex((c) => c.id === action.meta.arg)
        if (foundIndex !== -1) {
          state.sizeList.splice(foundIndex, 1)
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
        state.sizeList.push(action.payload.category)
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
      }) */
  }
})

export const { showEditSize, cancelSize } = sizeSlice.actions

const sizeReducer = sizeSlice.reducer
export default sizeReducer
