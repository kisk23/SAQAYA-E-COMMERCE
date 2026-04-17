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

      console.log('products:', data.products)
    } catch (err) {
      console.error('Fetch failed:', err)
    } finally {
      commit('setLoading', false)
    }
  },
  async loadMore({ commit, dispatch }) {
    commit('incrementPage')
    await dispatch('fetchProducts')
  },

  async fetchByCategory({ commit }, category) {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`)
      const data = await res.json()

      commit('setProducts', data.products)
    } catch (err) {
      console.error('Failed to fetch products:', err)
    }
  },
}
