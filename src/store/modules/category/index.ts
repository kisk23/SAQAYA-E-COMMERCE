import { Module } from 'vuex'
import { RootState } from '@/types'
import { CategoryState, state } from './state'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'

export const category: Module<CategoryState, RootState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
