import { GetterTree } from 'vuex'
import { ProductState } from './state'
import { RootState } from '@/types'

export const getters: GetterTree<ProductState, RootState> = {
  products: (state) => state.products,
  getProductById: (state) => (id: number) => {
    console.log('Getting product by ID:', id)
    return state.products.find((p) => p.id === id)
  },
  getByCategory: (state) => (category: string) => {
    return state.products.filter((p) => p.category === category)
  },
}
