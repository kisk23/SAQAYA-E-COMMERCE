<template>
  <section class="products">
    <BreadCrumbs :items="[{ label: 'Home', link: '/' }, { label: 'Products' }]" />

    <ProductsHeader @change="handleSortChange" />

    <ProductsList :products="sortedProducts" />

    <div v-if="!sortedProducts.length && !loading" class="products__empty">
      No products available
    </div>

    <LoadMoreButton v-if="hasMore" :loading="loading" @click="loadMore" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductsHeader from '@/components/product/ProductHeader.vue'
import ProductsList from '@/components/product/ProductList.vue'
import LoadMoreButton from '@/components/product/LoadMore.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'
import type { Product } from '@/types'

export default Vue.extend({
  name: 'ProductsView',

  components: {
    ProductsHeader,
    ProductsList,
    LoadMoreButton,
    BreadCrumbs,
  },

  data() {
    return {
      sortBy: 'Highest Rating',
    }
  },

  computed: {
    products(): Product[] {
      return this.$store.state.product.products as Product[]
    },
    sortedProducts(): Product[] {
      const sorted = [...this.products]

      if (this.sortBy === 'Price: Low to High') {
        return sorted.sort((a, b) => a.price - b.price)
      }

      if (this.sortBy === 'Price: High to Low') {
        return sorted.sort((a, b) => b.price - a.price)
      }

      return sorted.sort((a, b) => b.rating - a.rating)
    },
    loading() {
      return this.$store.state.product.loading
    },
    hasMore() {
      return this.$store.state.product.hasMore
    },
  },

  created() {
    if (!this.products.length) {
      this.$store.dispatch('product/fetchProducts')
    }
  },

  methods: {
    loadMore() {
      this.$store.dispatch('product/loadMore')
    },
    handleSortChange(option: string) {
      this.sortBy = option
    },
  },
})
</script>

<style scoped>
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
