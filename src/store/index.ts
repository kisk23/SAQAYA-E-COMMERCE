import Vue from 'vue'
import Vuex from 'vuex'
import { Product } from '@/types'
Vue.use(Vuex)

export interface RootState {
  products: Product[]
}
// using dumb json data for products, in a real app this would come from an API
export default new Vuex.Store<RootState>({
  state: {
    products: [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        description: 'This is product 1',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        description: 'This is product 2',
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        description: 'This is product 3',
      },
    ],
  },
  getters: {
    products: (state) => state.products,

    getProductById: (state) => (id: number) => {
      return state.products.find((p) => p.id === id)
    },
  },
})
