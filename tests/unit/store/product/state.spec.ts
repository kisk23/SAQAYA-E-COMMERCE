import { createInitialState } from '@/store/modules/product/state'

describe('product/state', () => {
  it('has correct default values', () => {
    expect(createInitialState()).toEqual({
      products: [],
      page: 1,
      loading: false,
      limit: 12,
      hasMore: true,
      activeCategory: null,
      sortBy: null,
      sortOrder: null,
    })
  })
})
