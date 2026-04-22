import type { ProductState } from '@/types'

export const createInitialState = (): ProductState => ({
  products: [],
  page: 1,
  loading: false,
  limit: 12,
  hasMore: true,
  activeCategory: null,
  sortBy: null,
  sortOrder: null,
})
