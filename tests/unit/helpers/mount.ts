import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import type { DefineComponent } from 'vue'
import { DOMWrapper } from '@vue/test-utils'




export type GetFn = (id: string) => DOMWrapper<Element>



export const createGetHelper = (
  wrapper: VueWrapper<any>,
  attr: 'data-test' | 'data-testid' = 'data-test'
): GetFn => {
  return (id: string) => wrapper.find(`[${attr}="${id}"]`)
}

interface SetupOptions {
  pinia?: ReturnType<typeof createTestingPinia>
  global?: Record<string, any>
}

interface SetupResult {
  wrapper: VueWrapper<any>
  get: GetFn
}


export const setupMount = (
  component: DefineComponent,
  options: SetupOptions = {},
  attr: 'data-test' | 'data-testid' = 'data-test'
): SetupResult => {
  const pinia =
    options.pinia ??
    createTestingPinia({
      createSpy: jest.fn,
      stubActions: true,
    })

  const wrapper = mount(component, {
    ...options,
    global: {
      plugins: [pinia],
      ...(options.global || {}),
    },
  })

  return {
    wrapper,
    get: createGetHelper(wrapper, attr),
  }
}


export const setupShallowMount = (
  component: DefineComponent,
  options: SetupOptions = {},
  attr: 'data-test' | 'data-testid' = 'data-test'
): SetupResult => {
  const pinia =
    options.pinia ??
    createTestingPinia({
      createSpy: jest.fn,
      stubActions: true,
    })

  const wrapper = shallowMount(component, {
    ...options,
    global: {
      plugins: [pinia],
      ...(options.global || {}),
    },
  })

  return {
    wrapper,
    get: createGetHelper(wrapper, attr),
  }
}


export const createCartTestingPinia = (initialState = {}) => {
  return createTestingPinia({
    createSpy: jest.fn,
    stubActions: true,
    initialState: {
      cart: {
        items: [],
        ...initialState,
      },
    },
  })
}