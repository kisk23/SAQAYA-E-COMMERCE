export interface CategoryState {
  categories: string[]
  loading: boolean
  category: string
}

export const state: CategoryState = {
  categories: [],
  loading: false,
  category: '',
}
