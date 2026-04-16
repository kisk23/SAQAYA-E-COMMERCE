import { Module } from 'vuex'
import { RootState } from '@/types'
import type { CartState } from '@/types/cart'
import { state } from './state'
import { mutations } from './mutations'

import { getters } from './getters'

export const cart: Module<CartState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
}
