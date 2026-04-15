export interface CategoryState {
  categories: string[]
  loading: boolean
}

export const state: CategoryState = {
  categories: [],
  loading: false,
}
