import { createTestingPinia } from '@pinia/testing'
import ProductCard from '@/components/shared/ProductCard.vue'
import { useCartStore } from '@/store/modules/cart'
import { mockProduct } from '@tests/helpers'
import { setupMount } from '@tests/helpers'
import { useRoute, useRouter } from 'vue-router'

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(),
}))

describe('ProductCard.vue', () => {
  let pushMock: jest.Mock

  const factory = (overrides = {}, options: Record<string, any> = {}) => {
    const pinia =
      options.pinia ??
      createTestingPinia({
        createSpy: jest.fn,
        stubActions: true,
      })

    const setup = setupMount(
      ProductCard,
      {
        ...options,
        pinia,
        props: { product: { ...mockProduct, ...overrides } },
      },
      'data-testid'
    )

    const cartStore = useCartStore(pinia)
    return { ...setup, cartStore }
  }

  beforeEach(() => {
    pushMock = jest.fn()
    ;(useRouter as unknown as jest.Mock).mockReturnValue({ push: pushMock })
    ;(useRoute as unknown as jest.Mock).mockReturnValue({ fullPath: '/', name: 'home' })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders product title and prices correctly', () => {
    const { get } = factory()

    expect(get('product-name').text()).toBe('Test Product')

    const discounted = (100 * (1 - 20 / 100)).toFixed(2)

    expect(get('product-price').text()).toContain(discounted)
    expect(get('product-old-price').text()).toContain('100.00')
  })

  it('calls cart store action when Add to Cart is clicked', async () => {
    const { get, cartStore } = factory()

    await get('add-to-cart').trigger('click')

    expect(cartStore.addToCart).toHaveBeenCalledTimes(1)
    expect(cartStore.addToCart).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }))
  })

  it('calls router.push when image is clicked', async () => {
    const { get } = factory()

    await get('product-image').trigger('click')

    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(pushMock).toHaveBeenCalledWith({
      path: '/products/1',
      query: {
        from: '/',
        fromLabel: 'Home',
      },
    })
  })

  it('renders no filled stars when rating is 0', () => {
    const { wrapper } = factory({ rating: 0, reviews: [] })

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
        props: { product: mockProduct },
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

  it('does not call cart action on mount', () => {
    const { cartStore } = factory()

    expect(cartStore.addToCart).not.toHaveBeenCalled()
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
