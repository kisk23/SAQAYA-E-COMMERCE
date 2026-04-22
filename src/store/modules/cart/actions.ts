import type { Product } from '@/types/product'
import { saveCart } from './cartStorage'

interface CartActionContext {
  cart: { product: Product; quantity: number }[]
}

export const actions = {
  addToCart(this: CartActionContext, product: Product) {
    const existingItem = this.cart.find((item) => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({ product, quantity: 1 })
    }

    saveCart(this.cart)
  },
  incrementCartItem(this: CartActionContext, productId: number) {
    const item = this.cart.find((entry) => entry.product.id === productId)
    if (item) item.quantity += 1

    saveCart(this.cart)
  },
  decreaseCartItem(this: CartActionContext, productId: number) {
    const itemIndex = this.cart.findIndex((entry) => entry.product.id === productId)
    if (itemIndex === -1) return

    const item = this.cart[itemIndex]
    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      this.cart.splice(itemIndex, 1)
    }

    saveCart(this.cart)
  },
  removeFromCart(this: CartActionContext, productId: number) {
    const itemIndex = this.cart.findIndex((entry) => entry.product.id === productId)

    if (itemIndex !== -1) {
      this.cart.splice(itemIndex, 1)
    }

    saveCart(this.cart)
  },
}
