import { MutationTree } from 'vuex'
import { Product } from '@/types'
import { CartState } from './state'

export const mutations: MutationTree<CartState> = {
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
}
