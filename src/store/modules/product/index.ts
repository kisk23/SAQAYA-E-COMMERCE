import { defineStore } from 'pinia'
import { createInitialState } from './state'
import { actions } from './actions'
import { getters } from './getters'

export const useProductStore = defineStore('product', {
  state: createInitialState,
  actions,
  getters,
})
