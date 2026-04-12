<template>
  <section class="products">
    <BreadCrumbs :items="[{ label: 'Home', link: '/' }, { label: 'Products' }]" />

    <ProductsHeader />

    <ProductsList :products="products" />

    <div v-if="!products.length && !loading" class="products__empty">No products available</div>

    <LoadMoreButton v-if="hasMore" :loading="loading" @click="loadMore" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductsHeader from '@/components/product/ProductHeader.vue'
import ProductsList from '@/components/product/ProductList.vue'
import LoadMoreButton from '@/components/product/LoadMore.vue'
import BreadCrumbs from '@/components/shared/BreadCrumbs.vue'

export default Vue.extend({
  name: 'ProductsView',

  components: {
    ProductsHeader,
    ProductsList,
    LoadMoreButton,
    BreadCrumbs,
  },

  computed: {
    products() {
      return this.$store.state.product.products
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
