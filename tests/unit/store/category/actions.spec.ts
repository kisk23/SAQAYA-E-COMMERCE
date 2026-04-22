import { actions } from '@/store/modules/category/actions'
import { categoryService } from '@/services/category.service'

jest.mock('@/services/category.service')

const mockedService = categoryService as jest.Mocked<typeof categoryService>

type CategoryActionCtx = {
  categories: string[]
  loading: boolean
  selectedCategory: string | null
}

const createContext = (overrides: Partial<CategoryActionCtx> = {}): CategoryActionCtx => ({
  categories: [],
  loading: false,
  selectedCategory: null,
  ...overrides,
})

describe('category/actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('fetchCategories updates categories on success', async () => {
    const ctx = createContext()
    mockedService.getCategories.mockResolvedValue({
      data: ['beauty', 'furniture'],
    } as never)

    await actions.fetchCategories.call(ctx)

    expect(mockedService.getCategories).toHaveBeenCalled()
    expect(ctx.categories).toEqual(['beauty', 'furniture'])
    expect(ctx.loading).toBe(false)
  })

  it('fetchCategories is guarded by loading', async () => {
    const ctx = createContext({ loading: true })

    await actions.fetchCategories.call(ctx)

    expect(mockedService.getCategories).not.toHaveBeenCalled()
  })

  it('setSelectedCategory and clearSelectedCategory update selection', () => {
    const ctx = createContext()

    actions.setSelectedCategory.call(ctx, 'beauty')
    expect(ctx.selectedCategory).toBe('beauty')

    actions.clearSelectedCategory.call(ctx)
    expect(ctx.selectedCategory).toBeNull()
  })
})
