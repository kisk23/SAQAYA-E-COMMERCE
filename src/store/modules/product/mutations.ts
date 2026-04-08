import { Product } from '@/types'
import { MutationTree } from 'vuex'
import { ProductState } from './state'

export const mutations: MutationTree<ProductState> = {
  setProducts(state, products: Product[]) {
    state.products = products
  },
  setLoading(state, value: boolean) {
    state.loading = value
  },
}
