import Vue from 'vue'
import Vuex from 'vuex'
import type { RootState, Product } from '@/types'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    products: [],
    cart: [],
    categories: [],
  },
  getters: {
    products: (state) => state.products,

    getProductById: (state) => (id: number) => {
      return state.products.find((p) => p.id === id)
    },
  },
  mutations: {
    setProducts(state, products: Product[]) {
      state.products = products
    },
    setCategories(state, categories: string[]) {
      state.categories = categories
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      console.log('ACTION STARTED')

      try {
        const response = await axios.get('https://dummyjson.com/products')

        console.log('AXIOS RESPONSE:', response.data)

        commit('setProducts', response.data.products)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    },
    async fetchCategories({ commit }) {
      console.log('FETCH CATEGORIES STARTED')
      //i want to fetch categories from the API and store them in the Vuex state.
      // maybe map it to icons since the API returns category names without icons.
      try {
        const response = await axios.get('https://dummyjson.com/products/category-list')

        console.log('AXIOS RESPONSE:', response.data)

        commit('setCategories', response.data)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    },
  },
})
