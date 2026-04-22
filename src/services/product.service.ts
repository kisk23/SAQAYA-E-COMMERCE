import { http } from './http'
import type { Product } from '@/types'

export const productService = {
  async getProducts(limit?: number, skip?: number, sortBy?: string, order?: 'asc' | 'desc') {
    const res = await http.get('/products', {
      params: {
        limit,
        skip,
        sortBy,
        order,
      },
    })

    return res.data
  },
  async getProductById(id: number): Promise<Product> {
    const res = await http.get(`/products/${id}`)
    return res.data
  },
  async getProductsByCategory(category: string) {
    const res = await http.get(`/products/category/${encodeURIComponent(category)}`)
    return res.data
  },
}
