import { ActionTree } from 'vuex'
import { RootState } from '@/types'
import { categoryService } from '@/services/category.service'
import { CategoryState } from './state'

export const actions: ActionTree<CategoryState, RootState> = {
  async fetchCategories({ state, commit }) {
    if (state.loading) return

    commit('setLoading', true)
    try {
      const response = await categoryService.getCategories()
      console.log('Fetched categories:', response.data)
      commit('setCategories', response.data)
    } catch (err) {
      console.error('Fetch categories failed:', err)
    } finally {
      commit('setLoading', false)
    }
  },
  setSelectedCategory({ commit }, category: string) {
    commit('setSelectedCategory', category)
  },
  clearSelectedCategory({ commit }) {
    commit('clearSelectedCategory')
  },
}
