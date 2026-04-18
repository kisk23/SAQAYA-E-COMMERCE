import { mutations } from '@/store/modules/category/mutations'
import { CategoryState } from '@/store/modules/category/state'

const createState = (overrides: Partial<CategoryState> = {}): CategoryState => ({
  categories: [],
  loading: false,
  selectedCategory: null,
  ...overrides,
})

describe('category/mutations', () => {
  it('setCategories replaces the list', () => {
    const state = createState()

    mutations.setCategories(state, ['beauty', 'furniture'])

    expect(state.categories).toEqual(['beauty', 'furniture'])
  })

  it('setSelectedCategory / clearSelectedCategory toggles selection', () => {
    const state = createState()

    mutations.setSelectedCategory(state, 'beauty')
    expect(state.selectedCategory).toBe('beauty')

    mutations.clearSelectedCategory(state)
    expect(state.selectedCategory).toBeNull()
  })
})
