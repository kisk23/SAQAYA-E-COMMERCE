import { actions } from '@/store/modules/category/actions'
import { categoryService } from '@/services/category.service'
import { AxiosResponse } from 'axios'

jest.mock('@/services/category.service')

const mockedService = categoryService as jest.Mocked<typeof categoryService>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionHandler = (ctx: any, payload?: any) => any

const createContext = (stateOverrides = {}) => ({
  state: { categories: [], loading: false, selectedCategory: null, ...stateOverrides },
  commit: jest.fn(),
  dispatch: jest.fn(),
  getters: {},
  rootState: {},
  rootGetters: {},
})

describe('category/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => jest.restoreAllMocks())

  it('fetchCategories commits categories on success', async () => {
    const ctx = createContext()
    mockedService.getCategories.mockResolvedValue({
      data: ['beauty', 'furniture'],
    } as AxiosResponse)

    await (actions.fetchCategories as ActionHandler)(ctx)

    expect(ctx.commit).toHaveBeenCalledWith('setLoading', true)
    expect(ctx.commit).toHaveBeenCalledWith('setCategories', ['beauty', 'furniture'])
    expect(ctx.commit).toHaveBeenCalledWith('setLoading', false)
  })

  it('fetchCategories is guarded by loading', async () => {
    const ctx = createContext({ loading: true })

    await (actions.fetchCategories as ActionHandler)(ctx)

    expect(ctx.commit).not.toHaveBeenCalled()
  })

  it('setSelectedCategory commits the category', () => {
    const ctx = createContext()

    ;(actions.setSelectedCategory as ActionHandler)(ctx, 'beauty')

    expect(ctx.commit).toHaveBeenCalledWith('setSelectedCategory', 'beauty')
  })
})
