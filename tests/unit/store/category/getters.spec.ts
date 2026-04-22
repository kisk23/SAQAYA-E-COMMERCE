import { getters } from '@/store/modules/category/getters'
import type { CategoryState } from '@/store/modules/category/state'

const createState = (overrides: Partial<CategoryState> = {}): CategoryState => ({
  categories: [],
  loading: false,
  selectedCategory: null,
  ...overrides,
})

describe('category/getters', () => {
  it('mappedCategories returns only known categories with label and icon', () => {
    const state = createState({ categories: ['beauty', 'unknown-slug', 'furniture'] })

    const result = getters.mappedCategories(state)

    expect(result).toEqual([
      { id: 'beauty', name: 'Beauty', icon: '/images/categories/beauty.svg' },
      { id: 'furniture', name: 'Furniture', icon: '/images/categories/furniture.svg' },
    ])
  })
})
