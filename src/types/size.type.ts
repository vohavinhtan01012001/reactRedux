import { Product } from './product.type'

export interface Size {
  id: number
  name: string
  description: string
  products: Product[]
}

export interface CreateSize {
  name: string
  description: string
}

export interface EdittingSize {
  name: string
  description: string
}
