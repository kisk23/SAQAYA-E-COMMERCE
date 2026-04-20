import type { CartItem } from './cart'
import type { Product } from './product'

export interface RootState {
  products: Product[]
  cart: CartItem[]
  categories: string[]
  loadingProducts: boolean
}

export interface ProductState {
  products: Product[]
  page: number
  loading: boolean
  limit: number
  hasMore: boolean
  activeCategory: string | null
}
