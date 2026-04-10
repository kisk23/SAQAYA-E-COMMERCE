import { http } from './http'

export const productService = {
  async getProducts() {
    return http.get('/products')
  },
}
