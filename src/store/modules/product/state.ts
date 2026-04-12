import { Product } from '@/types'

export interface ProductState {
  products: Product[]
  page: number
  loading: boolean
  limit: number
  hasMore: boolean
}

export const state: ProductState = {
  products: [],
  page: 1,
  loading: false,
  limit: 10,
  hasMore: true,
}
