import type { Product } from './product'

export interface CartItem {
  product: Product
  quantity: number
}

export interface NormalizedCartItem {
  id: number
  title: string
  image: string
  unitPrice: number
  quantity: number
  lineTotal: number
}

export interface CartState {
  cart: CartItem[]
}
