export interface ValidationErrors {
  name?: string
  email?: string
  message?: string
}
export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface Member {
  id: number
  name: string
  role: string
  image: string
}
