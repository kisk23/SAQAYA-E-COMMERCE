import { http } from './http'

export const productService = {
  async getProducts(limit?: number, skip?: number) {
    const res = await http.get('/products', {
      params: {
        limit,
        skip,
      },
    })

    return res.data
  },
}
