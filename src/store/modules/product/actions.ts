import { ActionTree } from 'vuex'
import { RootState } from '@/types'
import { ProductState } from './state'
import { productService } from '@/services/product.service'

export const actions: ActionTree<ProductState, RootState> = {
  async fetchProducts({ state, commit }) {
    if (state.products.length || state.loading) return

    commit('setLoading', true)

    try {
      const response = await productService.getProducts()
      console.log('products ' + response.data)
      commit('setProducts', response.data.products)
    } finally {
      commit('setLoading', false)
    }
  },
}
