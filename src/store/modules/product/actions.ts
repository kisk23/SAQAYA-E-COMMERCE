import { ActionTree } from 'vuex'
import { RootState } from '@/types'
import { ProductState } from './state'
import { productService } from '@/services/product.service'

export const actions: ActionTree<ProductState, RootState> = {
  async fetchProducts({ state, commit }) {
    if (state.loading || !state.hasMore) return

    commit('setLoading', true)

    try {
      const data = await productService.getProducts(state.limit, (state.page - 1) * state.limit)

      if (!data.products.length) {
        commit('setHasMore', false)
      } else {
        commit('addProducts', data.products)
      }

      commit('setActiveCategory', null)
      console.log('products:', data.products)
    } catch (err) {
      console.error('Fetch failed:', err)
    } finally {
      commit('setLoading', false)
    }
  },
  async loadMore({ state, commit, dispatch }) {
    // Load-more is only relevant for the default paginated listing.
    if (state.activeCategory) return

    commit('incrementPage')
    await dispatch('fetchProducts')
  },

  async fetchByCategory({ state, commit }, category: string) {
    if (!category || state.loading) return

    if (state.activeCategory === category && state.products.length) return

    commit('setLoading', true)
    commit('resetListingState')
    commit('setActiveCategory', category)

    try {
      const data = await productService.getProductsByCategory(category)

      commit('setProducts', data.products)
      commit('setHasMore', false)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      commit('setProducts', [])
      commit('setHasMore', false)
    } finally {
      commit('setLoading', false)
    }
  },
  prepareDefaultListing({ state, commit }) {
    if (state.activeCategory !== null) {
      commit('resetListingState')
      commit('setActiveCategory', null)
    }
  },
}
