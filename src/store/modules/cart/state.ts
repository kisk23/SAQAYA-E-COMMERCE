import { CartItem } from '@/types/cart'

export interface CartState {
  cart: CartItem[]
}

export const state: CartState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
}
