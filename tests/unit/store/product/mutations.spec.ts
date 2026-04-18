import { mutations } from '@/store/modules/product/mutations'
import { ProductState } from '@/store/modules/product/state'
import { Product } from '@/types'

const createState = (overrides: Partial<ProductState> = {}): ProductState => ({
  products: [],
  page: 1,
  loading: false,
  limit: 12,
  hasMore: true,
  activeCategory: null,
  ...overrides,
})

const makeProduct = (id: number, category = 'phones'): Product =>
  ({ id, title: `Product ${id}`, price: 100, category }) as unknown as Product

describe('product/mutations', () => {
  it('setProducts replaces the products array', () => {
    const state = createState({ products: [makeProduct(99)] })

    mutations.setProducts(state, [makeProduct(1)])

    expect(state.products).toEqual([makeProduct(1)])
  })

  it('addProducts appends new items and skips duplicates', () => {
    const state = createState({ products: [makeProduct(1)] })

    mutations.addProducts(state, [makeProduct(1), makeProduct(2)])

    expect(state.products.map((p) => p.id)).toEqual([1, 2])
  })

  it('incrementPage increments by one', () => {
    const state = createState({ page: 3 })

    mutations.incrementPage(state)

    expect(state.page).toBe(4)
  })

  it('setActiveCategory updates the category', () => {
    const state = createState()

    mutations.setActiveCategory(state, 'laptops')

    expect(state.activeCategory).toBe('laptops')
  })

  it('resetListingState clears products/page/hasMore only', () => {
    const state = createState({
      products: [makeProduct(1)],
      page: 5,
      hasMore: false,
      loading: true,
      activeCategory: 'laptops',
    })

    mutations.resetListingState(state)

    expect(state.products).toEqual([])
    expect(state.page).toBe(1)
    expect(state.hasMore).toBe(true)
    // untouched
    expect(state.loading).toBe(true)
    expect(state.activeCategory).toBe('laptops')
  })
})
