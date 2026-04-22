import { actions } from '@/store/modules/product/actions'
import { productService } from '@/services/product.service'
import type { Product } from '@/types'

jest.mock('@/services/product.service')

const mockedService = productService as jest.Mocked<typeof productService>

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

describe('product/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetchProducts appends unique products and clears activeCategory', async () => {
    const ctx = createContext({ products: [makeProduct(1)] })
    mockedService.getProducts.mockResolvedValue({
      products: [makeProduct(1), makeProduct(2)],
    })

    await actions.fetchProducts.call(ctx)

    expect(mockedService.getProducts).toHaveBeenCalledWith(12, 0, undefined, undefined)
    expect(ctx.products.map((item) => item.id)).toEqual([1, 2])
    expect(ctx.activeCategory).toBeNull()
    expect(ctx.loading).toBe(false)
  })

  it('fetchProducts is guarded by loading and hasMore', async () => {
    const loadingCtx = createContext({ loading: true })
    await actions.fetchProducts.call(loadingCtx)

    const noMoreCtx = createContext({ hasMore: false })
    await actions.fetchProducts.call(noMoreCtx)

    expect(mockedService.getProducts).not.toHaveBeenCalled()
  })

  it('loadMore increments page and calls fetchProducts when no active category', async () => {
    const ctx = createContext()

    await actions.loadMore.call(ctx)

    expect(ctx.page).toBe(2)
    expect(ctx.fetchProducts).toHaveBeenCalled()
  })

  it('loadMore does not fetch when a category filter is active', async () => {
    const ctx = createContext({ activeCategory: 'laptops' })

    await actions.loadMore.call(ctx)

    expect(ctx.page).toBe(1)
    expect(ctx.fetchProducts).not.toHaveBeenCalled()
  })

  it('fetchByCategory sets category products and turns off infinite loading', async () => {
    const ctx = createContext({
      products: [makeProduct(99)],
      page: 3,
      sortBy: 'title',
      sortOrder: 'asc',
    })

    mockedService.getProductsByCategory.mockResolvedValue({
      products: [makeProduct(1, 'laptops')],
    })

    await actions.fetchByCategory.call(ctx, 'laptops')

    expect(mockedService.getProductsByCategory).toHaveBeenCalledWith('laptops')
    expect(ctx.activeCategory).toBe('laptops')
    expect(ctx.products.map((item) => item.id)).toEqual([1])
    expect(ctx.page).toBe(1)
    expect(ctx.hasMore).toBe(false)
    expect(ctx.sortBy).toBeNull()
    expect(ctx.sortOrder).toBeNull()
    expect(ctx.loading).toBe(false)
  })

  it('fetchByCategory sets empty products on error', async () => {
    const ctx = createContext({ products: [makeProduct(1)] })
    mockedService.getProductsByCategory.mockRejectedValue(new Error('fail'))

    await actions.fetchByCategory.call(ctx, 'phones')

    expect(ctx.products).toEqual([])
    expect(ctx.hasMore).toBe(false)
    expect(ctx.loading).toBe(false)
  })

  it('prepareDefaultListing resets only when a category is active', () => {
    const active = createContext({
      products: [makeProduct(1)],
      page: 5,
      hasMore: false,
      activeCategory: 'laptops',
    })
    const inactive = createContext({
      products: [makeProduct(2)],
      page: 4,
      hasMore: false,
      activeCategory: null,
    })

    actions.prepareDefaultListing.call(active)
    actions.prepareDefaultListing.call(inactive)

    expect(active.products).toEqual([])
    expect(active.page).toBe(1)
    expect(active.hasMore).toBe(true)
    expect(active.activeCategory).toBeNull()

    expect(inactive.products.map((item) => item.id)).toEqual([2])
    expect(inactive.page).toBe(4)
    expect(inactive.hasMore).toBe(false)
  })
})
