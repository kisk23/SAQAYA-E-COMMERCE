import type { Product } from '@/types'
import { productService } from '@/services/product.service'

interface ProductActionContext {
  products: Product[]
  page: number
  loading: boolean
  limit: number
  hasMore: boolean
  activeCategory: string | null
  sortBy: string | null
  sortOrder: 'asc' | 'desc' | null
  fetchProducts: () => Promise<void>
}

export const actions = {
  async fetchProducts(this: ProductActionContext) {
    if (this.loading || !this.hasMore) return

    this.loading = true
    try {
      const data = await productService.getProducts(
        this.limit,
        (this.page - 1) * this.limit,
        this.sortBy ?? undefined,
        this.sortOrder ?? undefined
      )

      if (!data.products.length) {
        this.hasMore = false
      } else {
        const existingIds = new Set(this.products.map((p) => p.id))
        const filtered = data.products.filter((p: Product) => !existingIds.has(p.id))
        this.products.push(...filtered)
      }

      this.activeCategory = null
    } catch (err) {
      console.error('Fetch failed:', err)
    } finally {
      this.loading = false
    }
  },
  async loadMore(this: ProductActionContext) {
    if (this.activeCategory) return

    this.page += 1
    await this.fetchProducts()
  },
  async fetchSortedProducts(
    this: ProductActionContext,
    sortBy: string | null,
    sortOrder: 'asc' | 'desc' | null
  ) {
    if (this.loading) return

    this.sortBy = sortBy
    this.sortOrder = sortOrder
    this.products = []
    this.page = 1
    this.hasMore = true
    this.activeCategory = null

    await this.fetchProducts()
  },
  async fetchByCategory(this: ProductActionContext, category: string) {
    if (!category || this.loading) return

    if (this.activeCategory === category && this.products.length) return

    this.loading = true
    this.products = []
    this.page = 1
    this.hasMore = true
    this.activeCategory = category
    this.sortBy = null
    this.sortOrder = null

    try {
      const data = await productService.getProductsByCategory(category)

      this.products = data.products
      this.hasMore = false
    } catch (err) {
      console.error('Failed to fetch products:', err)
      this.products = []
      this.hasMore = false
    } finally {
      this.loading = false
    }
  },
  prepareDefaultListing(this: ProductActionContext) {
    if (this.activeCategory !== null) {
      this.products = []
      this.page = 1
      this.hasMore = true
      this.activeCategory = null
    }
  },
}
