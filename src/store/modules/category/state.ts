export interface CategoryState {
  categories: string[]
  loading: boolean
  selectedCategory: string | null
}

export const state: CategoryState = {
  categories: [],
  loading: false,
  selectedCategory: null,
}
