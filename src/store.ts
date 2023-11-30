import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from 'slice/admin/category.slice'
import userReducer from 'slice/admin/auth.slice'
import { useDispatch } from 'react-redux'
import productReducer from 'slice/admin/product.slice'
import promotionReducer from 'slice/admin/promotion.slice'
import productClientReducer from 'slice/client/productClient.slice'
import categoryClientReducer from 'slice/client/categoryClient.slice'

export const store = configureStore({
  reducer: {
    //admin
    category: categoryReducer,
    user: userReducer,
    product: productReducer,
    promotion: promotionReducer,
    //client
    productClient: productClientReducer,
    categoryClient: categoryClientReducer
  }
})
//Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
