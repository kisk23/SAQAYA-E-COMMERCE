import Vue from 'vue'
import Vuex from 'vuex'
import type { RootState, Product } from '@/types'
import axios from 'axios'
import type { CartItem, NormalizedCartItem } from '@/types/cart'
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
    cartItems(state): NormalizedCartItem[] {
      return state.cart.map((item: CartItem) => ({
        id: item.product.id,
        title: item.product.title,
        image: item.product.thumbnail || item.product.images[0] || '',
        unitPrice: item.product.price,
        quantity: item.quantity,
        lineTotal: item.product.price * item.quantity,
      }))
    },

    totalItems(state, getters): number {
      return getters.cartItems.reduce(
        (sum: number, item: NormalizedCartItem) => sum + item.quantity,
        0
      )
    },

    cartTotal(state, getters): number {
      return getters.cartItems.reduce(
        (sum: number, item: NormalizedCartItem) => sum + item.lineTotal,
        0
      )
    },
  },
  mutations: {
    setProducts(state, products: Product[]) {
      state.products = products
    },
    setCategories(state, categories: string[]) {
      state.categories = categories
    },

    addToCart(state, product: Product) {
      const existingItem = state.cart.find((item) => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({ product, quantity: 1 })
      }
    },
    incrementCartItem(state, productId: number) {
      const item = state.cart.find((entry) => entry.product.id === productId)
      if (item) item.quantity += 1
    },
    decreaseCartItem(state, productId: number) {
      const itemIndex = state.cart.findIndex((entry) => entry.product.id === productId)
      if (itemIndex === -1) return

      const item = state.cart[itemIndex]
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.cart.splice(itemIndex, 1)
      }
    },
    removeFromCart(state, productId: number) {
      const itemIndex = state.cart.findIndex((entry) => entry.product.id === productId)
      if (itemIndex !== -1) {
        state.cart.splice(itemIndex, 1)
      }
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
