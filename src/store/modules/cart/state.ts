import { CartState } from '@/types'

export const state: CartState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
}
