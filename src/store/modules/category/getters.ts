import { GetterTree } from 'vuex'
import { RootState } from '@/types'
import { CategoryState } from './state'

const categoryMap: Record<string, { label: string; icon: string }> = {
  beauty: {
    label: 'Beauty',
    icon: '/images/categories/beauty.svg',
  },
  furniture: {
    label: 'Furniture',
    icon: '/images/categories/furniture.svg',
  },
  fragrances: {
    label: 'Fragrance',
    icon: '/images/categories/fragrance.svg',
  },
  'mobile-accessories': {
    label: 'Mobile Accessories',
    icon: '/images/categories/mobile.svg',
  },
  'home-decoration': {
    label: 'Home Accessories',
    icon: '/images/categories/home.svg',
  },
}

export const getters: GetterTree<CategoryState, RootState> = {
  categories: (state) => state.categories,
  mappedCategories: (state) => {
    return state.categories
      .filter((cat) => categoryMap[cat])
      .map((cat) => ({
        id: cat,
        name: categoryMap[cat].label,
        icon: categoryMap[cat].icon,
      }))
  },
}
