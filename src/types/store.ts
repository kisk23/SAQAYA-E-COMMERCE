
import type { Product } from './product'


export interface ProductState {
  products: Product[]
  page: number
  loading: boolean
  limit: number
  hasMore: boolean
  activeCategory: string | null
}
