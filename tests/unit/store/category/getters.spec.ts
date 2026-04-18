import { getters } from '@/store/modules/category/getters'
import { CategoryState } from '@/store/modules/category/state'
import { RootState } from '@/types'

const r = {} as RootState

const createState = (overrides: Partial<CategoryState> = {}): CategoryState => ({
  categories: [],
  loading: false,
  selectedCategory: null,
  ...overrides,
})

describe('category/getters', () => {
  it('mappedCategories returns only known categories with label and icon', () => {
    const state = createState({ categories: ['beauty', 'unknown-slug', 'furniture'] })

    const result = getters.mappedCategories(state, {}, r, {})

    expect(result).toEqual([
      { id: 'beauty', name: 'Beauty', icon: '/images/categories/beauty.svg' },
      { id: 'furniture', name: 'Furniture', icon: '/images/categories/furniture.svg' },
    ])
  })

  it('selectedCategory returns current selection', () => {
    const state = createState({ selectedCategory: 'beauty' })

    expect(getters.selectedCategory(state, {}, r, {})).toBe('beauty')
  })
})
