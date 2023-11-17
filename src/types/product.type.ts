import { Category } from './category.type'
export interface Product {
  id: number
  name: string
  description: string
  price: string
  priceReduced: string
  quantity: string
  image: string
  image2: string
  image3: string
  image4: string
  gender: number
  status: number
  categoryId: number
  Category: Category
}

export interface CreateProduct {
  name: string
  description: string
  price: number
  quantity: number
  image: []
  gender: number
  status: number
  categoryId: number
}

export interface EdittingProduct {
  id: number
  name: string
  description: string
  price: string
  priceReduced: string
  quantity: string
  image1: string
  image2: string
  image3: string
  image4: string
  gender: number
  status: number
  categoryId: number
  image: string
}
