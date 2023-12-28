import { Product } from './product.type'

export interface Order {
  id: number
  fullname: string
  email: string
  phone: string
  address: string
  note: string
  sumPrice: number
  status: number
  pay: number
  vnp_TxnRef: number
  delivery: number
  cancelOrder: number
  userId: number
}

export interface OrderItem {
  id: number
  quantity: number
  price: number
  sumPrice: number
  orderId: number
  productId: number
  Product: Product
}
