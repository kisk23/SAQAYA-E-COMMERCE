import type { ContactForm, ValidationErrors } from '@/types/validation'

export function validateContactForm(form: ContactForm): {
  isValid: boolean
  errors: ValidationErrors
} {
  const errors: ValidationErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(form.email)) {
    errors.email = 'Invalid email format'
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
