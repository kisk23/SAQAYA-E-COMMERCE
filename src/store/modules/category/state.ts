export interface CategoryState {
  categories: string[]
  loading: boolean
  selectedCategory: string | null
}

export const createInitialState = (): CategoryState => ({
  categories: [],
  loading: false,
  selectedCategory: null,
})
