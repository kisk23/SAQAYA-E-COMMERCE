import { CartItem } from '@/types/cart'

export interface CartState {
  cart: CartItem[]
}

export const state: CartState = {
  cart: [],
}
