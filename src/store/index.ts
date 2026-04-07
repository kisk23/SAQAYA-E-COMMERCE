import Vue from 'vue'
import Vuex from 'vuex'
import type { RootState, Product } from '@/types'
import axios from 'axios'
import type { CartItem, NormalizedCartItem } from '@/types/cart'
Vue.use(Vuex)
const PRODUCTS_CACHE_KEY = 'products_cache'
const PRODUCTS_CACHE_TTL = 1000 * 60 * 5 // 5 minutes

export default new Vuex.Store<RootState>({
  state: {
    products: [],
    cart: [],
    categories: [],
    loadingProducts: false,
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

  //   If you're using modern Vue (3+), Pinia has mostly replaced Vuex.
  // No commit vs dispatch
  // You just call functions directly
  actions: {
    async fetchProducts({ state, commit }) {
      // prevent duplicate calls
      if (state.products.length || state.loadingProducts) return

      state.loadingProducts = true

      try {
        //  check localStorage cache
        const cached = localStorage.getItem(PRODUCTS_CACHE_KEY)

        if (cached) {
          try {
            const { data, timestamp } = JSON.parse(cached)

            //  validate time to live
            if (Date.now() - timestamp < PRODUCTS_CACHE_TTL) {
              commit('setProducts', data)
              return
            }
          } catch (e) {
            console.warn('Invalid cache, ignoring')
          }
        }

        //  fetch from API
        const response = await axios.get('https://dummyjson.com/products')

        const products = response.data.products

        commit('setProducts', products)

        //  save to cache
        localStorage.setItem(
          PRODUCTS_CACHE_KEY,
          JSON.stringify({
            data: products,
            timestamp: Date.now(),
          })
        )
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        state.loadingProducts = false
      }
    },
    //i want to fetch categories from the API and store them in the Vuex state.
    // maybe map it to icons since the API returns category names without icons.
    async fetchCategories({ commit }) {
      console.log('FETCH CATEGORIES STARTED')
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
