import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProductsView from '@/views/products/list/ProductsView.vue'
import ProductView from '@/views/products/detail/ProductView.vue'

import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
        beforeEnter: async (to, from, next) => {
          if (!store.getters['product/products'].length) {
            await store.dispatch('product/fetchProducts')
          }
          next()
        },
      },
      {
        path: 'products',
        name: 'products',
        component: ProductsView,
        beforeEnter: async (to, from, next) => {
          if (!store.getters['product/products'].length) {
            await store.dispatch('product/fetchProducts')
          }
          next()
        },
      },
      {
        path: 'products/:id',
        name: 'product',
        component: ProductView,
        props: true,
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView,
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactView,
      },
      {
        path: '*',
        name: 'not-found',
        component: NotFoundView,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
