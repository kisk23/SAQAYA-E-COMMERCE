import { Product } from '@/types'
import { MutationTree } from 'vuex'
import { ProductState } from './state'

export const mutations: MutationTree<ProductState> = {
  setProducts(state, products: Product[]) {
    state.products = products
  },
  addProducts(state, newProducts) {
    const existingIds = new Set(state.products.map((p) => p.id))

    const filtered = newProducts.filter((p: Product) => !existingIds.has(p.id))

    state.products.push(...filtered)
  },

  incrementPage(state) {
    state.page++
  },

  setHasMore(state, value) {
    state.hasMore = value
  },
  setLoading(state, value: boolean) {
    state.loading = value
  },
  setActiveCategory(state, category: string | null) {
    state.activeCategory = category
  },
  resetListingState(state) {
    state.products = []
    state.page = 1
    state.hasMore = true
  },
}
