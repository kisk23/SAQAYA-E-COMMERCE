import { state } from '@/store/modules/product/state'

describe('product/state', () => {
  it('has correct default values', () => {
    expect(state).toEqual({
      products: [],
      page: 1,
      loading: false,
      limit: 12,
      hasMore: true,
      activeCategory: null,
    })
  })
})
