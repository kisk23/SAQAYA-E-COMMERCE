

import { shallowMount } from '@vue/test-utils'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import {
  localVue,
  setupShallowMount,
  createCartStore,
  mockCartItems,
  mockMultiCartItems,
} from '@tests/helpers'

describe('CartDrawer (missing unit tests)', () => {
  let mutations: Record<string, jest.Mock>

  beforeEach(() => {
    mutations = {
      'cart/incrementCartItem': jest.fn(),
      'cart/decreaseCartItem': jest.fn(),
      'cart/removeFromCart': jest.fn(),
    }
  })

  const factory = (props = { isOpen: true }) => {
    const store = createCartStore({
      getters: {
        'cart/cartItems': () => mockCartItems,
        'cart/totalItems': () => 2,
        'cart/cartTotal': () => 200,
      },
      mutations,
    })

    return setupShallowMount(CartDrawer, {
      localVue,
      store,
      propsData: props,
    })
  }

  it('adds active class to backdrop when isOpen is true', () => {
    const { get } = factory({ isOpen: true })

    expect(get('backdrop').classes()).toContain('cart-drawer__backdrop--active')
  })

  it('does not add active class to backdrop when isOpen is false', () => {
    const { get } = factory({ isOpen: false })

    expect(get('backdrop').classes()).not.toContain('cart-drawer__backdrop--active')
  })

  it('has aria-label on the drawer element', () => {
    const { get } = factory()

    expect(get('drawer').attributes('aria-label')).toBe('Shopping cart')
  })

  it('renders item quantity', () => {
    const { get } = factory()

    expect(get('quantity').text()).toContain('2')
  })

  it('renders formatted per-item line total', () => {
    const { get } = factory()

    expect(get('total').text()).toContain('200')
  })

  it('renders all items when cart has multiple entries', () => {
    const store = createCartStore({
      getters: {
        'cart/cartItems': () => mockMultiCartItems,
        'cart/totalItems': () => 6,
        'cart/cartTotal': () => 600,
      },
      mutations,
    })

    const wrapper = shallowMount(CartDrawer, {
      localVue,
      store,
      propsData: { isOpen: true },
    })

    expect(wrapper.findAll('[data-test="cart-item"]').length).toBe(3)
  })

  it('renders subtotal row with cartTotal value', () => {
    const { get } = factory()

    expect(get('subtotal').text()).toContain('200')
  })

  it('renders shipping row as Free', () => {
    const { get } = factory()

    expect(get('shipping').text()).toContain('Free')
  })

  it('renders summary total row with cartTotal value', () => {
    const { get } = factory()

    expect(get('summary-total').text()).toContain('200')
  })

  it('renders the Place Order button', () => {
    const { get } = factory()

    expect(get('checkout').exists()).toBe(true)
    expect(get('checkout').text()).toBe('Place Order')
  })

  it('does not emit close when clicking inside the drawer', async () => {
    const { wrapper, get } = factory()

    await get('drawer').trigger('click')

    expect(wrapper.emitted('close')).toBeFalsy()
  })
})
