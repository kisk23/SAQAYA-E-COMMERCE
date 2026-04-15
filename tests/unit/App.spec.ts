import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

const HelloWorld = {
  template: `<div class="hello"><h1>Hello World</h1></div>`,
}

localVue.use(VueRouter)
localVue.use(Vuex)

describe('HelloWorld.vue', () => {
  it('renders hello world text', () => {
    const wrapper = mount(HelloWorld, { localVue })

    expect(wrapper.find('h1').text()).toBe('Hello World')
  })
})
