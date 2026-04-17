import { setupMount } from '@tests/helpers'
import { mockProduct } from '@tests/helpers'
import ProductCard from '@/components/shared/ProductCard.vue'

describe('ProductCard.vue', () => {
  const factory = (overrides = {}, mocks = {}) =>
    setupMount(
      ProductCard,
      {
        propsData: { product: { ...mockProduct, ...overrides } },
        mocks,
      },
      'data-testid'
    )

  it('renders product title and prices correctly', () => {
    const { get } = factory()

    expect(get('product-name').text()).toBe('Test Product')

    const discounted = (100 * (1 - 20 / 100)).toFixed(2)

    expect(get('product-price').text()).toContain(discounted)

    expect(get('product-old-price').text()).toContain('100.00')
  })

  it('calls $store.commit when Add to Cart is clicked', async () => {
    const commit = jest.fn()
    const { get } = factory({}, { $store: { commit } })

    await get('add-to-cart').trigger('click')

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('cart/addToCart', mockProduct)
  })

  it('calls $router.push when image is clicked', async () => {
    const push = jest.fn()
    const { get } = factory(
      {},
      {
        $router: { push },
        $route: { fullPath: '/' },
      }
    )

    await get('product-image').trigger('click')

    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledWith({
      path: '/products/1',
      query: {
        from: '/',
        fromLabel: 'Home',
      },
    })
  })

  it('renders no filled stars when there are no reviews', () => {
    const { wrapper } = factory({ reviews: [] })

    const stars = wrapper.findAll('[data-testid="star"]')
    const filledStars = stars.filter((star) => star.attributes('data-filled') === 'true')

    expect(filledStars.length).toBe(0)
  })

  it('renders product thumbnail with correct src and alt', () => {
    const { get } = factory()

    const img = get('product-image')

    expect(img.attributes('src')).toBe('test.jpg')
    expect(img.attributes('alt')).toBe('Product image: Test Product')
  })

  it('renders discount badge slot content when provided', () => {
    const { get } = setupMount(
      ProductCard,
      {
        propsData: { product: mockProduct },
        slots: {
          'discount-badge': '<span>-20%</span>',
        },
      },
      'data-testid'
    )

    const badge = get('discount-badge')

    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain('-20%')
  })

  it('renders empty discount badge slot when not provided', () => {
    const { get } = factory()

    const badge = get('discount-badge')

    expect(badge.text()).toBe('')
  })

  it('does not call $store.commit on mount', () => {
    const commit = jest.fn()

    factory({}, { $store: { commit } })

    expect(commit).not.toHaveBeenCalled()
  })

  it('renders without crashing when thumbnail is missing', () => {
    const { get } = factory({ thumbnail: '' })

    const img = get('product-image')
    expect(img.attributes('src')).toBe('')
  })

  it('renders same price for discounted and original when discount is 0', () => {
    const { get } = factory({ discountPercentage: 0 })

    expect(get('product-price').text()).toContain('100.00')
    expect(get('product-old-price').text()).toContain('100.00')
  })

  it('always renders exactly 5 stars', () => {
    const { wrapper } = factory()

    expect(wrapper.findAll('[data-testid="star"]').length).toBe(5)
  })
})
