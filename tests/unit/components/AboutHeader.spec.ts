import { mount } from '@vue/test-utils'
import AboutHeader from '@/components/about/AboutHeader.vue'

describe('AboutHeader.vue', () => {
  const setup = () => {
    const wrapper = mount(AboutHeader)

    const get = (id: string) => wrapper.find(`[data-test="${id}"]`)

    return { wrapper, get }
  }

  it('renders main section', () => {
    const { get } = setup()

    expect(get('about-header').exists()).toBe(true)
    expect(get('about-container').exists()).toBe(true)
  })

  it('renders title correctly', () => {
    const { get } = setup()

    expect(get('about-title').text()).toBe('Our Story')
  })

  it('renders description text', () => {
    const { get } = setup()

    expect(get('about-text').text()).toContain('Exclusive')
    expect(get('about-text').text()).toContain('2015')
  })

  it('renders image correctly', () => {
    const { get } = setup()

    const img = get('about-image')

    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('about')
  })
})
