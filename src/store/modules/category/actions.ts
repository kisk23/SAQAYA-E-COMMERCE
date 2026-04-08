import { ActionTree } from 'vuex'
import { RootState } from '@/types'
import { categoryService } from '@/services/category.service'
import { CategoryState } from './state'

export const actions: ActionTree<CategoryState, RootState> = {
  async fetchCategories({ commit }) {
    const response = await categoryService.getCategories()
    console.log('Fetched categories:', response.data)
    commit('setCategories', response.data)
  },
}
