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
  }
]

export { privateRoutes, authRouters, publicRoutes }
