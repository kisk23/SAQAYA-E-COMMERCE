import axios from 'axios'

export const productService = {
  async getProducts() {
    return axios.get('https://dummyjson.com/products')
  },
}
