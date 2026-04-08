import Vue from 'vue'
import Vuex from 'vuex'

import { product } from './modules/product'
import { cart } from './modules/cart'
import { category } from './modules/category'
import type { RootState } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    product,
    cart,
    category,
  },
})
