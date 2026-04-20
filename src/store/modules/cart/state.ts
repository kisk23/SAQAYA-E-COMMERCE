import type { CartState } from '@/types/cart'
import { loadCart } from './cartStorage'

export const createInitialState = (): CartState => ({
  cart: loadCart(),
})
