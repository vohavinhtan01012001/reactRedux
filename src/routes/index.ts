import Loading from 'component/loading/Loading'
import Category from 'pages/admin/category'
import Product from 'pages/admin/product'
import AddProduct from 'pages/admin/product/addProduct'
import EditProduct from 'pages/admin/product/editProduct'
import DefaultAuth from 'pages/auth'

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
    path: '/categories',
    component: Category
  },
  {
    path: '/products',
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
  }
]

export { privateRoutes, authRouters }
