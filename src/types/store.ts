import type { CartItem } from './cart'
import type { Product } from './product'

export interface RootState {
  products: Product[]
  cart: CartItem[]
}
