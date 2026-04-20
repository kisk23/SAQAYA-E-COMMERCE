import type { CartItem, CartState, NormalizedCartItem } from '@/types/cart'

export const getters = {
  cartItems(state: CartState): NormalizedCartItem[] {
    return state.cart.map((item: CartItem) => ({
      id: item.product.id,
      title: item.product.title,
      image: item.product.thumbnail ?? item.product.images?.[0] ?? null,
      unitPrice: item.product.price,
      quantity: item.quantity,
      lineTotal: item.product.price * item.quantity,
    }))
  },

  totalItems(state: CartState): number {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0)
  },

  cartTotal(state: CartState): number {
    return state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  },
}
