import { actions } from '@/store/modules/product/actions'
import { productService } from '@/services/product.service'

jest.mock('@/services/product.service')

const mockedService = productService as jest.Mocked<typeof productService>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionHandler = (ctx: any, payload?: any) => any

const createContext = (stateOverrides = {}) => {
  const state = {
    products: [],
    page: 1,
    loading: false,
    limit: 12,
    hasMore: true,
    activeCategory: null,
    ...stateOverrides,
  }

  return {
    state,
    commit: jest.fn(),
    dispatch: jest.fn(),
    getters: {},
    rootState: {},
    rootGetters: {},
  }
}

describe('product/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetchProducts commits products on success', async () => {
    const ctx = createContext()
    mockedService.getProducts.mockResolvedValue({ products: [{ id: 1 }] })

    await (actions.fetchProducts as ActionHandler)(ctx)

    expect(ctx.commit).toHaveBeenCalledWith('setLoading', true)
    expect(ctx.commit).toHaveBeenCalledWith('addProducts', [{ id: 1 }])
    expect(ctx.commit).toHaveBeenCalledWith('setLoading', false)
  })

  it('fetchProducts is guarded by loading and hasMore', async () => {
    const ctx = createContext({ loading: true })

    await (actions.fetchProducts as ActionHandler)(ctx)

    expect(ctx.commit).not.toHaveBeenCalled()
  })

  it('loadMore increments page and dispatches fetchProducts', async () => {
    const ctx = createContext()

    await (actions.loadMore as ActionHandler)(ctx)

    expect(ctx.commit).toHaveBeenCalledWith('incrementPage')
    expect(ctx.dispatch).toHaveBeenCalledWith('fetchProducts')
  })

  it('fetchByCategory fetches and commits category products', async () => {
    const ctx = createContext()
    mockedService.getProductsByCategory.mockResolvedValue({ products: [{ id: 1 }] })

    await (actions.fetchByCategory as ActionHandler)(ctx, 'phones')

    expect(ctx.commit).toHaveBeenCalledWith('setActiveCategory', 'phones')
    expect(ctx.commit).toHaveBeenCalledWith('setProducts', [{ id: 1 }])
    expect(ctx.commit).toHaveBeenCalledWith('setLoading', false)
  })

  it('fetchByCategory sets empty products on error', async () => {
    const ctx = createContext()
    mockedService.getProductsByCategory.mockRejectedValue(new Error('fail'))

    await (actions.fetchByCategory as ActionHandler)(ctx, 'phones')

    expect(ctx.commit).toHaveBeenCalledWith('setProducts', [])
    expect(ctx.commit).toHaveBeenCalledWith('setLoading', false)
  })

  it('prepareDefaultListing resets only when a category is active', () => {
    const active = createContext({ activeCategory: 'laptops' })
    const inactive = createContext()

    ;(actions.prepareDefaultListing as ActionHandler)(active)
    ;(actions.prepareDefaultListing as ActionHandler)(inactive)

    expect(active.commit).toHaveBeenCalledWith('resetListingState')
    expect(inactive.commit).not.toHaveBeenCalled()
  })
})
