import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import type { Component } from 'vue'
import { DOMWrapper } from '@vue/test-utils'

export type GetFn = (id: string) => DOMWrapper<Element>

export const createGetHelper = (
  wrapper: VueWrapper,
  attr: 'data-test' | 'data-testid' = 'data-test'
): GetFn => {
  return (id: string) => wrapper.find(`[${attr}="${id}"]`)
}

interface SetupOptions extends Record<string, any> {
  pinia?: ReturnType<typeof createTestingPinia>
  global?: Record<string, any>
  propsData?: Record<string, any>
  mocks?: Record<string, any>
}

interface SetupResult {
  wrapper: VueWrapper
  get: GetFn
}

const normalizeMountOptions = (options: SetupOptions, pinia: ReturnType<typeof createTestingPinia>) => {
  const normalized: Record<string, any> = { ...options }
  const global = { ...(options.global || {}) }
  const globalPlugins = [...(global.plugins || []), pinia]
  global.plugins = globalPlugins

  if (options.mocks) {
    global.mocks = { ...(global.mocks || {}), ...options.mocks }
    delete normalized.mocks
  }

  if (options.propsData && !options.props) {
    normalized.props = options.propsData
    delete normalized.propsData
  }

  delete normalized.pinia
  normalized.global = global

  return normalized
}

export const setupMount = (
  component: Component,
  options: SetupOptions = {},
  attr: 'data-test' | 'data-testid' = 'data-test'
): SetupResult => {
  const pinia =
    options.pinia ??
    createTestingPinia({
      createSpy: jest.fn,
      stubActions: true,
    })

  const wrapper = mount(component as any, normalizeMountOptions(options, pinia))

  return {
    wrapper,
    get: createGetHelper(wrapper, attr),
  }
}

export const setupShallowMount = (
  component: Component,
  options: SetupOptions = {},
  attr: 'data-test' | 'data-testid' = 'data-test'
): SetupResult => {
  const pinia =
    options.pinia ??
    createTestingPinia({
      createSpy: jest.fn,
      stubActions: true,
    })

  const wrapper = shallowMount(component as any, normalizeMountOptions(options, pinia))

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
        cart: [],
        ...initialState,
      },
    },
  })
}
