import { Module } from 'vuex'
import { RootState } from '@/types'
import { state, ProductState } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

export const product: Module<ProductState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
