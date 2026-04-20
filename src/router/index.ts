import { createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// import MainLayout from '@/layouts/MainLayout.vue'
// import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
// import ContactView from '@/views/ContactView.vue'
// import NotFoundView from '@/views/NotFoundView.vue'
// import ProductsView from '@/views/products/list/ProductsView.vue'
// import ProductView from '@/views/products/detail/ProductView.vue'
// import { ensureProductsLoaded, validateProductId } from './guards'

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     component: MainLayout,
//     children: [
//       {
//         path: '',
//         name: 'home',
//         component: HomeView,
//         beforeEnter: ensureProductsLoaded,
//       },
//       {
//         path: 'products',
//         name: 'products',
//         component: ProductsView,
//         beforeEnter: ensureProductsLoaded,
//       },
//       {
//         path: 'products/:id',
//         name: 'product',
//         component: ProductView,
//         props: true,
//         beforeEnter: validateProductId,
//       },
//       {
//         path: 'about',
//         name: 'about',
//         component: AboutView,
//       },
//       {
//         path: 'contact',
//         name: 'contact',
//         component: ContactView,
//       },
//       {
//         path: ':pathMatch(.*)*',
//         name: 'not-found',
//         component: NotFoundView,
//       },
//     ],
//   },
// ]
const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
