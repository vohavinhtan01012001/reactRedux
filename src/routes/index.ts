import Category from 'pages/admin/category'
import Product from 'pages/admin/product'
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
  }
]

export { privateRoutes, authRouters }
