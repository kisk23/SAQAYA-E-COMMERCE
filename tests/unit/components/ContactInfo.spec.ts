import { mount } from '@vue/test-utils'
import ContactInfo from '@/components/contact/ContactInfo.vue'

describe('ContactInfo.vue', () => {
  const setup = () => {
    const wrapper = mount(ContactInfo)

    const get = (id: string) => wrapper.find(`[data-test="${id}"]`)

    return { wrapper, get }
  }

  it('renders main container', () => {
    const { get } = setup()

    expect(get('contact-info').exists()).toBe(true)
  })

  it('renders call section correctly', () => {
    const { get } = setup()

    expect(get('call-block').exists()).toBe(true)
    expect(get('call-title').text()).toBe('Call us')
    expect(get('call-description').text()).toContain('24/7')
    expect(get('call-phone').text()).toContain('+8801611112222')
  })

  it('renders divider', () => {
    const { get } = setup()

    expect(get('divider').exists()).toBe(true)
  })

  it('renders email section correctly', () => {
    const { get } = setup()

    expect(get('email-block').exists()).toBe(true)
    expect(get('email-title').text()).toBe('Write To US')
    expect(get('email-description').text()).toContain('contact you within 24 hours')
  })
})
