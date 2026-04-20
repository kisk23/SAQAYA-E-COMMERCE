import type { ProductState } from '@/types'

export const getters = {
  getProductById: (state: ProductState) => (id: number) => {
    return state.products.find((p) => p.id === id)
  },
  getByCategory: (state: ProductState) => (category: string) => {
    return state.products.filter((p) => p.category === category)
  },
}
