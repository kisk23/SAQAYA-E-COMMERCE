import { defineStore } from 'pinia'
import { createInitialState } from './state'
import { actions } from './actions'
import { getters } from './getters'

export const useCategoryStore = defineStore('category', {
  state: createInitialState,
  actions,
  getters,
})

export type { CategoryState } from './state'
