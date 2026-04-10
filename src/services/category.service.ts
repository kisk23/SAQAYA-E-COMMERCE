import { http } from './http'

export const categoryService = {
  async getCategories() {
    return http.get('/products/category-list')
  },
}
