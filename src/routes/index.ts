import Category from 'pages/admin/components/category'
import Product from 'pages/admin/components/product'
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
  }
  /* {
    path: '/modal',
    component: EditCategory
  } */
]

export { privateRoutes, authRouters }
