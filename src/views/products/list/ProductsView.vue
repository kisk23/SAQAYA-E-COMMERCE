<template>
  <section class="products">
    <BreadCrumbs :items="productsBreadcrumbs" />

    <ProductsHeader @change="handleSortChange" />

    <ProductsList :products="products" />

    <div v-if="!products.length && !loading" class="products__empty">No products available</div>

    <LoadMoreButton v-if="hasMore && !isCategoryMode" :loading="loading" @click="loadMore" />
  </section>
</template>

<script setup lang="ts">
import ProductsHeader from '@/components/product/ProductHeader.vue'
import ProductsList from '@/components/product/ProductList.vue'
import LoadMoreButton from '@/components/product/LoadMore.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'
import type { Product } from '@/types'
import type { BreadcrumbItem } from '@/types/breadcrumb'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/store/modules/product'
import { useCategoryStore } from '@/store/modules/category'

const SORT_OPTIONS = ['Highest Rating', 'Price: Low to High', 'Price: High to Low'] as const

type SortOption = (typeof SORT_OPTIONS)[number]
type ApiSortOrder = 'asc' | 'desc'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const categoryStore = useCategoryStore()

const sortBy = ref<SortOption>('Highest Rating')
const SORT_TO_API: Record<SortOption, { sortBy: string; order: ApiSortOrder }> = {
  'Highest Rating': { sortBy: 'rating', order: 'desc' },
  'Price: Low to High': { sortBy: 'price', order: 'asc' },
  'Price: High to Low': { sortBy: 'price', order: 'desc' },
}

const getSingleQueryValue = (value: unknown): string | null => {
  if (typeof value === 'string') return value
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
  return null
}

const parseCategoryQuery = (value: unknown): string => {
  const single = getSingleQueryValue(value)
  return single ? single.trim() : ''
}

const isSortOption = (value: unknown): value is SortOption => {
  return typeof value === 'string' && (SORT_OPTIONS as readonly string[]).includes(value)
}

const productsBreadcrumbs = computed<BreadcrumbItem[]>(() => {
  const homePath = getSingleQueryValue(route.query.homePath) ?? '/'
  const homeLabel = getSingleQueryValue(route.query.homeLabel) ?? 'Home'

  return [
    { label: homeLabel, link: homePath },
    { label: 'Products', link: '/products' },
  ]
})

const products = computed<Product[]>(() => productStore.products)
const activeCategory = computed<string | null>(() => productStore.activeCategory)
const selectedCategory = computed<string | null>(() => categoryStore.selectedCategory)
const isCategoryMode = computed<boolean>(() => Boolean(selectedCategory.value))
const loading = computed<boolean>(() => productStore.loading)
const hasMore = computed<boolean>(() => productStore.hasMore)

const loadMore = (): void => {
  productStore.loadMore()
}

const handleSortChange = (option: string): void => {
  if (!isSortOption(option)) return

  sortBy.value = option
  router
    .replace({
      query: {
        ...route.query,
        sort: option,
      },
    })
    .catch(() => undefined)
}

const syncProductsWithRoute = async (rawCategory: unknown): Promise<void> => {
  const category = parseCategoryQuery(rawCategory)

  if (category) {
    categoryStore.setSelectedCategory(category)

    if (activeCategory.value !== category || !products.value.length) {
      await productStore.fetchByCategory(category)
    }

    return
  }

  categoryStore.clearSelectedCategory()

  if (activeCategory.value !== null) {
    productStore.prepareDefaultListing()
  }

  const apiSort = SORT_TO_API[sortBy.value]
  await productStore.fetchSortedProducts(apiSort.sortBy, apiSort.order)
}

const initialSort = getSingleQueryValue(route.query.sort)
if (isSortOption(initialSort)) {
  sortBy.value = initialSort
}

watch(
  () => route.query.sort,
  async (value) => {
    if (isSortOption(value)) {
      sortBy.value = value
    } else {
      sortBy.value = 'Highest Rating'
    }

    if (!isCategoryMode.value) {
      const apiSort = SORT_TO_API[sortBy.value]
      await productStore.fetchSortedProducts(apiSort.sortBy, apiSort.order)
    }
  }
)

watch(
  () => route.query.category,
  async (value) => {
    await syncProductsWithRoute(value)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.products {
  max-width: 1170px;
  margin: 40px auto;
  padding: 32px 24px;
  background: #fff;
}
.products__empty {
  text-align: center;
  margin: 40px 0;
  color: #6b7280;
}
@media (max-width: 768px) {
  .products {
    padding: 24px 16px;
    margin: 24px auto;
  }
}

@media (max-width: 480px) {
  .products {
    padding: 16px 12px;
    margin: 16px auto;
  }
}
</style>
