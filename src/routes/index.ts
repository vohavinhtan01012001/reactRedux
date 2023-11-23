import Loading from 'component/loading/Loading'
import Category from 'pages/admin/category'
import Product from 'pages/admin/product'
import AddProduct from 'pages/admin/product/addProduct'
import EditProduct from 'pages/admin/product/editProduct'
import DefaultAuth from 'pages/auth'
import Promotion from '../pages/admin/promotion/Promotion'
import AddProductList from 'pages/admin/promotion/addProductList'

const authRouters = [
  {
    path: '/login',
    component: DefaultAuth
  }
]

const publicRoutes = []

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
  }
]

export { privateRoutes, authRouters }
