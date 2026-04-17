import { MutationTree } from 'vuex'
import { CategoryState } from './state'

export const mutations: MutationTree<CategoryState> = {
  setCategories(state: CategoryState, categories: string[]) {
    state.categories = categories
  },
  setLoading(state: CategoryState, value: boolean) {
    state.loading = value
  },
  setSelectedCategory(state: CategoryState, category: string) {
    state.selectedCategory = category
  },
  clearSelectedCategory(state: CategoryState) {
    state.selectedCategory = null
  },
}
