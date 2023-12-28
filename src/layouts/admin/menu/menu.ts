import { faPage4, faWindows } from '@fortawesome/free-brands-svg-icons'
import {
  faTachometer,
  faTable,
  faLock,
  faNoteSticky,
  faNotdef,
  faShirt,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons'

const initMenu = [
  {
    label: 'Dashboard',
    path: '/admin/',
    icon: faTachometer
  },
  {
    label: 'Product'
  },
  {
    label: 'Product',
    path: '/admin/product',
    icon: faShirt
  },
  {
    label: 'Add Product',
    path: '/admin/add-product',
    icon: faCirclePlus
  },

  {
    label: 'Category'
  },
  {
    label: 'Category',
    path: '/admin/category',
    icon: faWindows
  },

  {
    label: 'Promotion'
  },
  {
    label: 'Promotion',
    path: '/admin/promotion',
    icon: faWindows
  },
  {
    label: 'Order'
  },
  {
    label: 'Order',
    path: '/admin/order',
    icon: faWindows
  },
  {
    label: 'Otentikasi'
  },
  {
    label: 'Login',
    path: '/auth/login',
    icon: faLock
  },
  {
    label: 'Register',
    path: '/auth/register',
    icon: faNoteSticky
  }
]

export default initMenu
