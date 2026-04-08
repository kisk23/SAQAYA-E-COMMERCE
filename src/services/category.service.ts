import axios from 'axios'

export const categoryService = {
  async getCategories() {
    return axios.get('https://dummyjson.com/products/category-list')
  },
}
