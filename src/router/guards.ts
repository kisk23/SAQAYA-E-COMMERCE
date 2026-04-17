import { NavigationGuard } from 'vue-router'
import store from '@/store'

export const ensureProductsLoaded: NavigationGuard = async (to, from, next) => {
  try {
    const queryCategory =
      typeof to.query.category === 'string'
        ? to.query.category.trim()
        : Array.isArray(to.query.category) && typeof to.query.category[0] === 'string'
          ? to.query.category[0].trim()
          : ''

    if (to.name === 'products' && queryCategory) {
      next()
      return
    }

    if (!store.getters['product/products'].length) {
      await store.dispatch('product/fetchProducts')
    }
    next()
  } catch (e) {
    next(false)
  }
}

export const validateProductId: NavigationGuard = async (to, from, next) => {
  const id = Number(to.params.id)

  if (!Number.isInteger(id) || id < 1 || id > 100) {
    return next({ name: 'not-found' })
  }

  next()
}
