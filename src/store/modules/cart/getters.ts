import { GetterTree } from 'vuex'
import { CartState } from './state'
import { RootState } from '@/types'
import { CartItem, NormalizedCartItem } from '@/types/cart'

export const getters: GetterTree<CartState, RootState> = {
  cartItems(state): NormalizedCartItem[] {
    return state.cart.map((item: CartItem) => ({
      id: item.product.id,
      title: item.product.title,
      image: item.product.thumbnail ?? item.product.images?.[0] ?? null,
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
}
