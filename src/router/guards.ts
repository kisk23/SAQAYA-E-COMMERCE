import type{ NavigationGuard } from 'vue-router'
import pinia from '@/store'
import { useProductStore } from '@/store/modules/product'

export const ensureProductsLoaded: NavigationGuard = async (to) => {
  try {
    const productStore = useProductStore(pinia)
    const queryCategory =
      typeof to.query.category === 'string'
        ? to.query.category.trim()
        : Array.isArray(to.query.category) && typeof to.query.category[0] === 'string'
          ? to.query.category[0].trim()
          : ''

    if (to.name === 'products' && queryCategory) {
      return true
    }

    if (!productStore.products.length) {
      await productStore.fetchProducts()
    }

    return true
  } catch (e) {
    return false
  }
}

export const validateProductId: NavigationGuard = async (to) => {
  const id = Number(to.params.id)

  if (!Number.isInteger(id) || id < 1 || id > 100) {
    return { name: 'not-found' }
  }

  return true
}
