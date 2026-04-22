import { actions } from '@/store/modules/product/actions'
import type { Product } from '@/types'

const makeProduct = (id: number, category = 'phones'): Product =>
  ({ id, title: `Product ${id}`, price: 100, category } as unknown as Product)

type ProductActionCtx = {
  products: Product[]
  page: number
  loading: boolean
  limit: number
  hasMore: boolean
  activeCategory: string | null
  sortBy: string | null
  sortOrder: 'asc' | 'desc' | null
  fetchProducts: jest.Mock<Promise<void>, []>
}

const createContext = (overrides: Partial<ProductActionCtx> = {}): ProductActionCtx => ({
  products: [],
  page: 1,
  loading: false,
  limit: 12,
  hasMore: true,
  activeCategory: null,
  sortBy: null,
  sortOrder: null,
  fetchProducts: jest.fn().mockResolvedValue(undefined),
  ...overrides,
})

describe('product/state updates via actions', () => {
  it('fetchSortedProducts resets listing state and delegates to fetchProducts', async () => {
    const ctx = createContext({
      products: [makeProduct(1)],
      page: 4,
      hasMore: false,
      activeCategory: 'phones',
    })

    await actions.fetchSortedProducts.call(ctx, 'title', 'asc')

    expect(ctx.sortBy).toBe('title')
    expect(ctx.sortOrder).toBe('asc')
    expect(ctx.products).toEqual([])
    expect(ctx.page).toBe(1)
    expect(ctx.hasMore).toBe(true)
    expect(ctx.activeCategory).toBeNull()
    expect(ctx.fetchProducts).toHaveBeenCalled()
  })

  it('fetchSortedProducts returns early when already loading', async () => {
    const ctx = createContext({
      loading: true,
      products: [makeProduct(1)],
      page: 3,
    })

    await actions.fetchSortedProducts.call(ctx, 'rating', 'desc')

    expect(ctx.sortBy).toBeNull()
    expect(ctx.sortOrder).toBeNull()
    expect(ctx.products.map((item) => item.id)).toEqual([1])
    expect(ctx.page).toBe(3)
    expect(ctx.fetchProducts).not.toHaveBeenCalled()
  })
})
