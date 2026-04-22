import { createInitialState } from '@/store/modules/category/state'

describe('category/state', () => {
  it('createInitialState returns expected defaults', () => {
    expect(createInitialState()).toEqual({
      categories: [],
      loading: false,
      selectedCategory: null,
    })
  })
})
