import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from 'slice/admin/category.slice'
import userReducer from 'slice/admin/auth.slice'
import { useDispatch } from 'react-redux'
import productReducer from 'slice/admin/product.slice'
import promotionReducer from 'slice/admin/promotion.slice'
import productClientReducer from 'slice/client/productClient.slice'
import categoryClientReducer from 'slice/client/categoryClient.slice'
import sizeReducer from 'slice/admin/size.slice'
import userClientReducer from 'slice/client/userClient.slice'
import orderClientReducer from 'slice/client/orderClient.slice'
import orderReducer from 'slice/admin/order.slice'

export const store = configureStore({
  reducer: {
    //admin
    category: categoryReducer,
    user: userReducer,
    product: productReducer,
    promotion: promotionReducer,
    size: sizeReducer,
    order: orderReducer,
    //client
    productClient: productClientReducer,
    categoryClient: categoryClientReducer,
    userClient: userClientReducer,
    orderClient: orderClientReducer
  }
})
//Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
