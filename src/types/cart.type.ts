import { Category } from './category.type'
import { Size } from './size.type'

export interface Cart {
  id: number
  name: string
  description: string
  price: number
  priceReduced: number
  quantity: number
  image: string
  image2: string
  image3: string
  image4: string
  gender: number
  status: number
  categoryId: number
  Size: Size
  promotionId: number
  sizeId: number
  productGroupId: number
  Category: Category
  quantityCart: number
  priceCart: number
}

export interface ShowCart {
  id: number
  quantityCart: number
  priceCart: number
}

export interface CartPayment {
  id: number
  quantityCart: number
}
