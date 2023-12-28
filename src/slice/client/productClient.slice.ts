import { AsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addFavouriteProduct,
  showCategoryAndSizeAndMinMaxPrice,
  showDetailProduct,
  showFavouriteProduct,
  showFavouriteProductList,
  showFilterProduct
} from 'api/client/productClient.api'
import {
  getListProductOfCategory,
  getProductListPageHome,
  searchProductClient,
  showCartClient
} from 'api/client/productClient.api'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { Cart } from 'types/cart.type'
import { Category } from 'types/category.type'
import { Product } from 'types/product.type'
import { Size } from 'types/size.type'
import { Status } from 'types/status.type'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface ProductClientState {
  productList: Product[]
  product: Product | null
  category: Category | null
  categoryList: Category[]
  priceMinInit: number
  priceMaxInit: number
  priceMin: number
  priceMax: number
  heart: boolean
  cart: Cart[]
  sumPriceCart: number
  sizeList: any[]
  sizeListDetail: any[]
  imageBig: string
  status: Status | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: ProductClientState = {
  productList: [],
  product: null,
  category: null,
  categoryList: [],
  heart: false,
  priceMin: 0,
  priceMax: 0,
  priceMinInit: 0,
  priceMaxInit: 0,
  cart: [],
  sumPriceCart: 0,
  sizeList: [],
  sizeListDetail: [],
  imageBig: '',
  status: null,
  loading: false,
  currentRequestId: undefined
}

const productClientSlice = createSlice({
  name: 'productClient',
  initialState,
  reducers: {
    showProductList: (state, action) => {
      console.log(action.payload)
      if (action.payload == 1) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.price
          const right = b.price
          return left === right ? 0 : left > right ? 1 : -1
        })
        return { ...state, productList: sortedProducts }
      } else if (action.payload == 2) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.price
          const right = b.price
          return left === right ? 0 : left < right ? 1 : -1
        })
        console.log(sortedProducts)
        return { ...state, productList: sortedProducts }
      } else if (action.payload == 3) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.name.toLowerCase()
          const right = b.name.toLowerCase()
          return left.localeCompare(right)
        })
        console.log(sortedProducts)
        return { ...state, productList: sortedProducts }
      } else if (action.payload == 4) {
        const sortedProducts = state.productList.slice().sort((a, b) => {
          const left = a.name.toLowerCase()
          const right = b.name.toLowerCase()
          return right.localeCompare(left)
        })
        console.log(sortedProducts)
        return { ...state, productList: sortedProducts }
      }
      return state
    },
    showImageBig: (state, action) => {
      state.imageBig = action.payload
    },
    addToCart: (state, action) => {
      const productData = action.payload.product
      const dataFromCookie = Cookies.get('cart')
      let parsedData = dataFromCookie ? JSON.parse(dataFromCookie) : []

      const isItemInCart = parsedData.some((item: any) => item.id === productData?.id)

      if (!isItemInCart) {
        parsedData.push({ id: productData.id, quantityCart: 1 })
        console.log('Dữ liệu từ cookie: ', parsedData)

        const updatedDataJSON = JSON.stringify(parsedData)

        Cookies.set('cart', updatedDataJSON, { expires: 7 })
        toast.success('Add to cart success', {
          position: toast.POSITION.TOP_RIGHT
        })
      } else {
        console.log('Item is already in the cart')
        toast.warning('Item is already in the cart', {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    },
    showCart: (state) => {
      const dataFromCookie = Cookies.get('cart')
      state.cart = dataFromCookie ? JSON.parse(dataFromCookie) : []
      const cart = state.cart
      const sumPrice = cart.reduce((sum, item) => sum + item.priceCart, 0)
      state.sumPriceCart = sumPrice
    },
    decrementQuantity: (state, action: any) => {
      const { id, scope } = action.payload
      let sumPrice: number = state.sumPriceCart
      const updatedCart: any[] = state.cart.map((item: any) => {
        if (item.id === id) {
          if (scope === 'inc' && item.quantityCart < item.quantity) {
            sumPrice += item.priceReduced
            return {
              ...item,
              quantityCart: item.quantityCart + 1,
              priceCart: (item.quantityCart + 1) * item.priceReduced
            }
          } else if (scope === 'dec' && item.quantityCart > 1) {
            sumPrice -= item.priceReduced
            return {
              ...item,
              quantityCart: item.quantityCart - 1,
              priceCart: (item.quantityCart - 1) * item.priceReduced
            }
          } else if (scope === 'inc' && item.quantityCart >= item.quantity) {
            toast.warning(`The maximum number of ${item.name} is ${item.quantity}`, {
              position: toast.POSITION.TOP_RIGHT
            })
            return { ...item, quantityCart: item.quantityCart }
          } else if (scope === 'dec' && item.quantityCart < 1) {
            toast.warning(`The Minimum ${item.name} quantity is 1`, {
              position: toast.POSITION.TOP_RIGHT
            })
            return { ...item, quantityCart: item.quantityCart }
          }
        }
        return item
      })
      const data = updatedCart.map((item) => {
        return { id: item.id, quantityCart: item.quantityCart }
      })
      const updatedDataJSON = JSON.stringify(data)
      Cookies.set('cart', updatedDataJSON, { expires: 7 })

      state.sumPriceCart = sumPrice
      state.cart = updatedCart
    },
    deleteCartItem: (state, action: any) => {
      const foundIndex = state.cart.findIndex((c) => c.id === action.payload.id)
      if (foundIndex !== -1) {
        const price: number = state.cart[foundIndex].priceCart
        state.sumPriceCart = state.sumPriceCart - price
        state.cart.splice(foundIndex, 1)
        const updatedDataJSON = JSON.stringify(state.cart)
        Cookies.set('cart', updatedDataJSON, { expires: 7 })
      }
    },
    updateMinMaxPrice: (state, action) => {
      const { min, max } = action.payload
      state.priceMin = min
      state.priceMax = max
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getProductListPageHome.fulfilled, (state, action) => {
        state.productList = action.payload.product
      })
      .addCase(getListProductOfCategory.fulfilled, (state, action) => {
        state.productList = action.payload.product
        state.category = action.payload.category
      })
      .addCase(showDetailProduct.fulfilled, (state, action) => {
        state.product = action.payload.product
        state.category = action.payload.category
        state.sizeListDetail = action.payload.listSize
        state.productList = action.payload.productList
      })
      .addCase(searchProductClient.fulfilled, (state, action) => {
        state.productList = action.payload.product
        if (state.category) {
          state.category.name = action.meta.arg
        }
      })
      .addCase(showCartClient.fulfilled, (state, action) => {
        state.cart = action.payload.listCart
        state.sumPriceCart = action.payload.sumPrice
      })
      .addCase(addFavouriteProduct.fulfilled, (state, action) => {
        state.heart = action.payload.favourite
      })
      .addCase(showFavouriteProduct.fulfilled, (state, action) => {
        state.heart = action.payload.favourite
      })
      .addCase(showFavouriteProductList.fulfilled, (state, action) => {
        state.productList = action.payload.productList
      })
      .addCase(showCategoryAndSizeAndMinMaxPrice.fulfilled, (state, action) => {
        state.categoryList = action.payload.category
        state.sizeList = action.payload.size
        state.priceMinInit = action.payload.minPrice
        state.priceMaxInit = action.payload.maxPrice
      })
      .addCase(showFilterProduct.fulfilled, (state, action) => {
        state.productList = action.payload.products
      })
  }
})
export const {
  showProductList,
  showImageBig,
  addToCart,
  showCart,
  decrementQuantity,
  deleteCartItem,
  updateMinMaxPrice
} = productClientSlice.actions
const productClientReducer = productClientSlice.reducer
export default productClientReducer
