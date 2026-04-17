import { localVue, setupMount } from '@tests/helpers'

const HelloWorld = {
  template: `<div class="hello"><h1>Hello World</h1></div>`,
}

describe('HelloWorld.vue', () => {
  it('renders hello world text', () => {
    const { wrapper } = setupMount(HelloWorld, { localVue })

    expect(wrapper.find('h1').text()).toBe('Hello World')
  })
})
