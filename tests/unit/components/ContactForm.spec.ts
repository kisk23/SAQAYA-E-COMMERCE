import { setupMount } from '@tests/helpers'
import ContactForm from '@/components/contact/ContactForm.vue'
import { validateContactForm } from '@/services/validation.service'
import type { ValidationErrors } from '@/types/validation'

type ContactFormVm = {
  form: {
    name: string
    email: string
    message: string
  }
  errors: ValidationErrors
}

jest.mock('@/services/validation.service')

describe('ContactForm.vue', () => {
  const mockValidate = validateContactForm as jest.Mock

  const setup = () => setupMount(ContactForm)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all fields correctly', () => {
    const { get } = setup()

    expect(get('name-input').exists()).toBe(true)
    expect(get('email-input').exists()).toBe(true)
    expect(get('message-input').exists()).toBe(true)
    expect(get('submit-button').exists()).toBe(true)
  })

  it('shows validation errors when invalid', async () => {
    mockValidate.mockReturnValue({
      isValid: false,
      errors: {
        name: 'Name required',
        email: 'Email invalid',
        message: 'Message required',
      },
    })

    const { wrapper, get } = setup()

    await wrapper.find('form').trigger('submit.prevent')

    expect(get('name-error').text()).toBe('Name required')
    expect(get('email-error').text()).toBe('Email invalid')
    expect(get('message-error').text()).toBe('Message required')
  })

  it('does not submit when invalid', async () => {
    mockValidate.mockReturnValue({
      isValid: false,
      errors: { name: 'Required' },
    })

    window.alert = jest.fn()

    const { wrapper } = setup()

    await wrapper.find('form').trigger('submit.prevent')

    expect(window.alert).not.toHaveBeenCalled()
  })

  it('submits valid form and resets state', async () => {
    mockValidate.mockReturnValue({
      isValid: true,
      errors: {},
    })

    window.alert = jest.fn()

    const { wrapper, get } = setup()

    await get('name-input').setValue('John')
    await get('email-input').setValue('john@test.com')
    await get('message-input').setValue('Hello')

    await wrapper.find('form').trigger('submit.prevent')

    expect(mockValidate).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@test.com',
      message: 'Hello',
    })

    expect(window.alert).toHaveBeenCalledWith('Form submitted!')

    const vm = wrapper.vm as unknown as ContactFormVm

    expect(vm.form).toEqual({
      name: '',
      email: '',
      message: '',
    })

    expect(vm.errors).toEqual({})
  })

  it('updates v-model correctly', async () => {
    const { get, wrapper } = setup()

    await get('name-input').setValue('Alice')

    expect((wrapper.vm as unknown as ContactFormVm).form.name).toBe('Alice')
  })

  it('hides all error spans when errors are cleared', async () => {
    mockValidate.mockReturnValueOnce({
      isValid: false,
      errors: {
        name: 'Name required',
        email: 'Email invalid',
        message: 'Message required',
      },
    })

    const { wrapper, get } = setup()

    await wrapper.find('form').trigger('submit.prevent')

    expect(get('name-error').exists()).toBe(true)
    expect(get('email-error').exists()).toBe(true)
    expect(get('message-error').exists()).toBe(true)

    mockValidate.mockReturnValueOnce({ isValid: true, errors: {} })
    window.alert = jest.fn()

    await wrapper.find('form').trigger('submit.prevent')

    expect(get('name-error').exists()).toBe(false)
    expect(get('email-error').exists()).toBe(false)
    expect(get('message-error').exists()).toBe(false)
  })

  it('shows error when name is missing', async () => {
    mockValidate.mockReturnValue({
      isValid: false,
      errors: { name: 'Name required' },
    })

    const { wrapper, get } = setup()

    await wrapper.find('form').trigger('submit.prevent')

    expect(get('name-error').exists()).toBe(true)
    expect(get('email-error').exists()).toBe(false)
    expect(get('message-error').exists()).toBe(false)
  })
})
