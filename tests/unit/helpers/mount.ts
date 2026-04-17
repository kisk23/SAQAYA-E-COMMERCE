import { mount, shallowMount, Wrapper, createLocalVue } from '@vue/test-utils'
import Vuex, { Store, GetterTree, MutationTree } from 'vuex'
import { RootState, CartState } from '@/types'

const localVue = createLocalVue()
localVue.use(Vuex)

export { localVue }

export type GetFn = (id: string) => Wrapper<Vue>

export const createGetHelper = (
  wrapper: Wrapper<Vue>,
  attr: 'data-test' | 'data-testid' = 'data-test'
): GetFn => {
  return (id: string) => wrapper.find(`[${attr}="${id}"]`)
}

interface SetupResult {
  wrapper: Wrapper<Vue>
  get: GetFn
}

export const setupMount = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any> = {},
  attr: 'data-test' | 'data-testid' = 'data-test'
): SetupResult => {
  const wrapper = mount(component, options)
  const get = createGetHelper(wrapper, attr)
  return { wrapper, get }
}

export const setupShallowMount = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any> = {},
  attr: 'data-test' | 'data-testid' = 'data-test'
): SetupResult => {
  const wrapper = shallowMount(component, options)
  const get = createGetHelper(wrapper, attr)
  return { wrapper, get }
}

// Vuex store factory for cart-related tests

export interface CartStoreOptions {
  getters?: Partial<GetterTree<CartState, RootState>>
  mutations?: Partial<MutationTree<CartState>>
}

export const createCartStore = (overrides: CartStoreOptions = {}): Store<RootState> => {
  const defaultGetters: GetterTree<CartState, RootState> = {
    'cart/cartItems': () => [],
    'cart/totalItems': () => 0,
    'cart/cartTotal': () => 0,
    ...overrides.getters,
  }

  const defaultMutations: MutationTree<CartState> = {
    'cart/incrementCartItem': jest.fn(),
    'cart/decreaseCartItem': jest.fn(),
    'cart/removeFromCart': jest.fn(),
    ...overrides.mutations,
  }

  return new Vuex.Store({
    getters: defaultGetters,
    mutations: defaultMutations,
  })
}
