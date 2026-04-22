<template>
  <section class="product-view">
    <BreadCrumbs :items="productBreadcrumbs" />

    <p v-if="loading" class="product-view__state">Loading product...</p>

    <p v-else-if="error" class="product-view__state product-view__state--error">
      Failed to load product.
    </p>

    <p v-else-if="!product" class="product-view__state">Product not found.</p>

    <div v-else class="product-view__content">
      <ProductMain :product="product" class="product-view__gallery" />
      <ProductInfo :product="product" class="product-view__info" @buy-now="handleBuyNow" />
    </div>
    <MoreofCategory v-if="product" :category="product.category" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '@/types'
import type { BreadcrumbItem } from '@/types/breadcrumb'
import ProductMain from '@/components/product-detail/ProductMain.vue'
import ProductInfo from '@/components/product-detail/ProductInfo.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'
import { productService } from '@/services/product.service'
import MoreofCategory from '@/components/product-detail/MoreofCategory.vue'
import { getSingleQueryValue } from '@/utils/query'

const route = useRoute()
const loading = ref(false)
const error = ref(false)
const product = ref<Product | null>(null)

const productBreadcrumbs = computed<BreadcrumbItem[]>(() => {
  const fromPath = getSingleQueryValue(route.query.from) ?? '/products'
  const fromLabel = getSingleQueryValue(route.query.fromLabel) ?? 'Products'

  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', link: '/' }]

  if (fromPath !== '/') {
    breadcrumbs.push({ label: fromLabel, link: fromPath })
  }

  breadcrumbs.push({ label: product.value?.title || 'Product', link: '' })

  return breadcrumbs
})

const fetchProductByRouteParam = async (rawId: unknown): Promise<void> => {
  const raw = Array.isArray(rawId) ? rawId[0] : rawId
  const id = Number(raw)

  if (!Number.isFinite(id) || id <= 0) {
    product.value = null
    error.value = false
    loading.value = false
    return
  }

  loading.value = true
  error.value = false

  try {
    product.value = await productService.getProductById(id)
  } catch {
    product.value = null
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleBuyNow = ({ product, qty }: { product: Product; qty: number }): void => {
  console.log(product, qty)
}

watch(
  () => route.params.id,
  async (id) => {
    await fetchProductByRouteParam(id)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.product-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-view__state {
  text-align: center;
  padding: 40px;
  color: #888;
  font-family: 'DM Sans', sans-serif;
}

.product-view__state--error {
  color: #e53935;
}

.product-view__content {
  display: flex;
  align-items: flex-start;
  gap: 48px;
}

.product-view__gallery {
  flex: 1;
  min-width: 0;
}

.product-view__info {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .product-view__content {
    flex-direction: column;
    gap: 24px;
  }
}
</style>
