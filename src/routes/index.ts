import Loading from 'component/loading/Loading'
import DefaultAuth from 'pages/auth'
import Promotion from '../pages/admin/promotion/Promotion'
import AddProduct from 'pages/admin/product/AddProduct'
import EditProduct from 'pages/admin/product/EditProduct'
import Product from 'pages/admin/product/Product'
import Category from 'pages/admin/category/Category'
import AddProductList from 'pages/admin/promotion/AddProductList'
import ShowListProduct from 'pages/admin/promotion/ShowListProduct'
import Home from 'pages/client/home/Home'
import Collection from 'pages/client/collection/Collection'
import ProductDetail from 'pages/client/productDetail/ProductDetail'
import ListSize from 'pages/admin/product/size/ListSize'
import ProductGroup from 'pages/admin/product/ProductGroup'
import Cart from 'pages/client/cart/Cart'
import Search from 'pages/client/search/Search'
import Pay from 'pages/client/pay/Pay'
import ListOrder from 'pages/admin/order/ListOrder'
import ShowOrderDetail from 'pages/admin/order/ShowOrderDetail'
import TabsListOrder from 'pages/admin/order/TabsListOrder'
import Thanks from 'pages/client/pay/Thanks'
import Account from 'pages/client/account/Account'
import OrderItems from 'pages/client/account/OrderItem'
import Favourite from 'pages/client/favourite/Favourite'

const authRouters = [
  {
    path: '/login',
    component: DefaultAuth
  }
]

const publicRoutes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/collection/:id',
    component: Collection
  },
  {
    path: '/:slug/:id',
    component: ProductDetail
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/thanks',
    component: Thanks
  },
  {
    path: '/account',
    component: Account
  },
  {
    path: '/order/:id',
    component: OrderItems
  },
  {
    path: '/favourite',
    component: Favourite
  }
]

const privateRoutes = [
  {
    path: '/',
    component: Product
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/product',
    component: Product
  },
  {
    path: '/add-product',
    component: AddProduct
  },
  {
    path: '/edit-product/:id',
    component: EditProduct
  },
  {
    path: '/product/:id',
    component: ProductGroup
  },
  {
    path: '/size',
    component: ListSize
  },
  {
    path: '/loading',
    component: Loading
  },
  {
    path: '/promotion',
    component: Promotion
  },
  {
    path: '/promotion/add-product/:id',
    component: AddProductList
  },
  {
    path: '/promotion/list-product/:id',
    component: ShowListProduct
  },
  /* {
    path: '/order',
    component: ListOrder
  }, */
  {
    path: '/order/:id',
    component: ShowOrderDetail
  },
  {
    path: '/order',
    component: TabsListOrder
  }
]

export { privateRoutes, authRouters, publicRoutes }
