import { http } from './http'
import type { Product } from '@/types'

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
  async getProductById(id: number): Promise<Product> {
    const res = await http.get(`/products/${id}`)
    return res.data
  },
}
