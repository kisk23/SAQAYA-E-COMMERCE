<template>
  <section class="product-view">
    <BreadCrumbs
      :items="[
        { label: 'Home', link: '/' },
        { label: 'Products', link: '/products' },
        { label: product?.title, link: `/products/${product?.id}` },
      ]"
    />

    <p v-if="loading" class="product-view__state">Loading product...</p>

    <p v-else-if="error" class="product-view__state product-view__state--error">
      Failed to load product.
    </p>

    <p v-else-if="!product" class="product-view__state">Product not found.</p>

    <div v-else class="product-view__content">
      <ProductMain :product="product" class="product-view__gallery" />
      <ProductInfo :product="product" class="product-view__info" @buy-now="handleBuyNow" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Product } from '@/types'
import ProductMain from '@/components/product-detail/ProductMain.vue'
import ProductInfo from '@/components/product-detail/ProductInfo.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'

export default Vue.extend({
  name: 'ProductView',

  components: {
    ProductMain,
    ProductInfo,
    BreadCrumbs,
  },

  data() {
    return {
      loading: false,
      error: false,
    }
  },

  computed: {
    product(): Product | null {
      const id = Number(this.$route.params.id)
      return this.$store.getters['product/getProductById'](id) || null
    },
  },

  async created() {
    if (this.product) return
    await this.fetchProduct()
  },

  watch: {
    '$route.params.id': {
      immediate: false,
      handler() {
        if (this.product) return
        this.fetchProduct()
      },
    },
  },

  methods: {
    async fetchProduct(): Promise<void> {
      this.loading = true
      this.error = false
      try {
        await this.$store.dispatch('product/fetchProducts')
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },

    handleBuyNow({ product, qty }: { product: Product; qty: number }): void {
      console.log(product, qty)
    },
  },
})
</script>

<style scoped>
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
