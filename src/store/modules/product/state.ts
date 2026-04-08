import { Product } from '@/types'

export interface ProductState {
  products: Product[]
  loading: boolean
}

export const state: ProductState = {
  products: [],
  loading: false,
}
