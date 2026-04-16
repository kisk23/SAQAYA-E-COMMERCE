import { mount } from '@vue/test-utils'
import ProductCard from '@/components/shared/ProductCard.vue'

//createLocalVue() = isolation tool
// prevents global side effects
// mostly useful with real plugins
// e.g. Vue Router and Vuex
//const localVue = createLocalVue()

//or we can use mocking both $store and $router directly via mocks: {},
//  so you never need a real Vuex/Router instance registered

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  discountPercentage: 20,
  thumbnail: 'test.jpg',
  reviews: [{ rating: 4 }, { rating: 4 }],
}

describe('ProductCard.vue', () => {
  it('renders product title and prices correctly', () => {
    const wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
    })

    expect(wrapper.find('[data-testid="product-name"]').text()).toBe('Test Product')

    const discounted = (100 * (1 - 20 / 100)).toFixed(2)

    expect(wrapper.find('[data-testid="product-price"]').text()).toContain(discounted)

    expect(wrapper.find('[data-testid="product-old-price"]').text()).toContain('100.00')
  })

  it('calls $store.commit when Add to Cart is clicked', async () => {
    const commit = jest.fn()

    const wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
      mocks: {
        $store: { commit },
      },
    })

    await wrapper.find('[data-testid="add-to-cart"]').trigger('click')

    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('cart/addToCart', mockProduct)
  })

  it('calls $router.push when image is clicked', async () => {
    const push = jest.fn()

    const wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
      mocks: {
        $router: { push },
        $route: { fullPath: '/' },
      },
    })

    await wrapper.find('[data-testid="product-image"]').trigger('click')

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
    const wrapper = mount(ProductCard, {
      propsData: { product: { ...mockProduct, reviews: [] } },
    })

    const stars = wrapper.findAll('[data-testid="star"]')
    const filledStars = stars.filter((star) => star.attributes('data-filled') === 'true')

    expect(filledStars.length).toBe(0)
  })

  it('renders product thumbnail with correct src and alt', () => {
    const wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
    })

    const img = wrapper.find('[data-testid="product-image"]')

    expect(img.attributes('src')).toBe('test.jpg')
    expect(img.attributes('alt')).toBe('Product image: Test Product')
  })

  it('renders discount badge slot content when provided', () => {
    const wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
      slots: {
        'discount-badge': '<span>-20%</span>',
      },
    })

    const badge = wrapper.find('[data-testid="discount-badge"]')

    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain('-20%')
  })

  it('renders empty discount badge slot when not provided', () => {
    const wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
    })

    const badge = wrapper.find('[data-testid="discount-badge"]')

    expect(badge.text()).toBe('')
  })

  it('does not call $store.commit on mount', () => {
    const commit = jest.fn()

    mount(ProductCard, {
      propsData: { product: mockProduct },
      mocks: { $store: { commit } },
    })

    expect(commit).not.toHaveBeenCalled()
  })
  it('renders without crashing when thumbnail is missing', () => {
    const wrapper = mount(ProductCard, {
      propsData: { product: { ...mockProduct, thumbnail: '' } },
    })

    const img = wrapper.find('[data-testid="product-image"]')
    expect(img.attributes('src')).toBe('')
  })
  it('renders same price for discounted and original when discount is 0', () => {
    const wrapper = mount(ProductCard, {
      propsData: { product: { ...mockProduct, discountPercentage: 0 } },
    })

    expect(wrapper.find('[data-testid="product-price"]').text()).toContain('100.00')
    expect(wrapper.find('[data-testid="product-old-price"]').text()).toContain('100.00')
  })
  it('always renders exactly 5 stars', () => {
    const wrapper = mount(ProductCard, {
      propsData: { product: mockProduct },
    })

    expect(wrapper.findAll('[data-testid="star"]').length).toBe(5)
  })
})
