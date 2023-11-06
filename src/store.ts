import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from 'pages/admin/components/category/adminCategory.slice'
import userReducer from 'pages/auth/auth.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: userReducer
  }
})
//Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
