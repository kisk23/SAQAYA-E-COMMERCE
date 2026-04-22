import { defineStore } from 'pinia'
import { createInitialState } from './state'
import { getters } from './getters'
import { actions } from './actions'

export const useCartStore = defineStore('cart', {
  state: createInitialState,
  getters,
  actions,
})

export type { CartState } from '@/types/cart'
