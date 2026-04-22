import { getters } from '@/store/modules/product/getters'
import type { Product, ProductState } from '@/types'

const createState = (overrides: Partial<ProductState> = {}): ProductState => ({
  products: [],
  page: 1,
  loading: false,
  limit: 12,
  hasMore: true,
  activeCategory: null,
  sortBy: null,
  sortOrder: null,
  ...overrides,
})

const makeProduct = (id: number, category = 'phones'): Product =>
  ({ id, title: `Product ${id}`, price: 100, category }) as unknown as Product

describe('product/getters', () => {
  it('getProductById finds product or returns undefined', () => {
    const state = createState({ products: [makeProduct(1), makeProduct(2)] })
    const finder = getters.getProductById(state)

    expect(finder(2)).toEqual(makeProduct(2))
    expect(finder(999)).toBeUndefined()
  })

  it('getByCategory filters products by category', () => {
    const state = createState({
      products: [makeProduct(1, 'phones'), makeProduct(2, 'laptops'), makeProduct(3, 'phones')],
    })
    const filter = getters.getByCategory(state)

    expect(filter('phones')).toHaveLength(2)
    expect(filter('shoes')).toEqual([])
  })
})
