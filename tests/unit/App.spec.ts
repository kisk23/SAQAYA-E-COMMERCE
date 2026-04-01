import { createLocalVue } from '@vue/test-utils'

import VueRouter from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

describe('App.vue', () => {
  // tests will be here
})
