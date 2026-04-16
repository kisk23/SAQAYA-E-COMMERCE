import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import { Store, GetterTree, MutationTree } from 'vuex'

import { RootState, CartState } from '@/types'


const localVue = createLocalVue()
localVue.use(Vuex)

const mockItems = [
  {
    id: 1,
    title: 'Test Product',
    quantity: 2,
    image: 'img.jpg',
    lineTotal: 200,
  },
]

describe('CartDrawer (missing unit tests)', () => {
  let store: Store<RootState>
  let getters: GetterTree<CartState, RootState>
  let mutations: MutationTree<CartState>

  beforeEach(() => {
    getters = {
      'cart/cartItems': () => mockItems,
      'cart/totalItems': () => 2,
      'cart/cartTotal': () => 200,
    }

    mutations = {
      'cart/incrementCartItem': jest.fn(),
      'cart/decreaseCartItem': jest.fn(),
      'cart/removeFromCart': jest.fn(),
    }

    store = new Vuex.Store({ getters, mutations })
  })

  const factory = (props = { isOpen: true }) =>
    shallowMount(CartDrawer, { localVue, store, propsData: props })

  it('adds active class to backdrop when isOpen is true', () => {
    const wrapper = factory({ isOpen: true })

    expect(wrapper.find('[data-test="backdrop"]').classes()).toContain(
      'cart-drawer__backdrop--active'
    )
  })

  it('does not add active class to backdrop when isOpen is false', () => {
    const wrapper = factory({ isOpen: false })

    expect(wrapper.find('[data-test="backdrop"]').classes()).not.toContain(
      'cart-drawer__backdrop--active'
    )
  })

  it('defaults isOpen to false when prop is not passed', () => {
    const wrapper = shallowMount(CartDrawer, { localVue, store })

    expect(wrapper.find('[data-test="drawer"]').classes()).not.toContain('cart-drawer--active')
  })

  it('has aria-label on the drawer element', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="drawer"]').attributes('aria-label')).toBe('Shopping cart')
  })

  it('renders item quantity', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="quantity"]').text()).toContain('2')
  })

  it('renders formatted per-item line total', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="total"]').text()).toContain('200')
  })

  it('renders all items when cart has multiple entries', () => {
    const multiGetters = {
      'cart/cartItems': () => [
        { id: 1, title: 'Product A', quantity: 1, image: 'a.jpg', lineTotal: 100 },
        { id: 2, title: 'Product B', quantity: 3, image: 'b.jpg', lineTotal: 300 },
        { id: 3, title: 'Product C', quantity: 2, image: 'c.jpg', lineTotal: 200 },
      ],
      'cart/totalItems': () => 6,
      'cart/cartTotal': () => 600,
    }

    const multiStore = new Vuex.Store({ getters: multiGetters, mutations })
    const wrapper = shallowMount(CartDrawer, {
      localVue,
      store: multiStore,
      propsData: { isOpen: true },
    })

    expect(wrapper.findAll('[data-test="cart-item"]').length).toBe(3)
  })

  it('renders subtotal row with cartTotal value', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="subtotal"]').text()).toContain('200')
  })

  it('renders shipping row as Free', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="shipping"]').text()).toContain('Free')
  })

  it('renders summary total row with cartTotal value', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="summary-total"]').text()).toContain('200')
  })

  it('renders the Place Order button', () => {
    const wrapper = factory()

    expect(wrapper.find('[data-test="checkout"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="checkout"]').text()).toBe('Place Order')
  })

  it('does not emit close when clicking inside the drawer', async () => {
    const wrapper = factory()

    await wrapper.find('[data-test="drawer"]').trigger('click')

    expect(wrapper.emitted('close')).toBeFalsy()
  })
})
