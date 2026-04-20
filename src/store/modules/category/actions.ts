import { categoryService } from '@/services/category.service'

interface CategoryActionContext {
  categories: string[]
  loading: boolean
  selectedCategory: string | null
}

export const actions = {
  async fetchCategories(this: CategoryActionContext) {
    if (this.loading) return

    this.loading = true
    try {
      const response = await categoryService.getCategories()
      this.categories = response.data
    } catch (err) {
      console.error('Fetch categories failed:', err)
    } finally {
      this.loading = false
    }
  },
  setSelectedCategory(this: CategoryActionContext, category: string) {
    this.selectedCategory = category
  },
  clearSelectedCategory(this: CategoryActionContext) {
    this.selectedCategory = null
  },
}
