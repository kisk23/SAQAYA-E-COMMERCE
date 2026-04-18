import { getters } from '@/store/modules/product/getters'
import { ProductState } from '@/store/modules/product/state'
import { Product, RootState } from '@/types'

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

const r = {} as RootState

describe('product/getters', () => {
  it('products returns the products array', () => {
    const state = createState({ products: [makeProduct(1)] })

    expect(getters.products(state, {}, r, {})).toEqual([makeProduct(1)])
  })

  it('getProductById finds product or returns undefined', () => {
    const state = createState({ products: [makeProduct(1), makeProduct(2)] })
    const finder = getters.getProductById(state, {}, r, {}) as (id: number) => Product | undefined

    expect(finder(2)).toEqual(makeProduct(2))
    expect(finder(999)).toBeUndefined()
  })

  it('getByCategory filters products by category', () => {
    const state = createState({
      products: [makeProduct(1, 'phones'), makeProduct(2, 'laptops'), makeProduct(3, 'phones')],
    })
    const filter = getters.getByCategory(state, {}, r, {}) as (c: string) => Product[]

    expect(filter('phones')).toHaveLength(2)
    expect(filter('shoes')).toEqual([])
  })
})
