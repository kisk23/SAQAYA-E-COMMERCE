import { NavigationGuard } from 'vue-router'
import store from '@/store'

export const ensureProductsLoaded: NavigationGuard = async (to, from, next) => {
  try {
    if (!store.getters['product/products'].length) {
      await store.dispatch('product/fetchProducts')
    }
    next()
  } catch (e) {
    next(false)
  }
}
