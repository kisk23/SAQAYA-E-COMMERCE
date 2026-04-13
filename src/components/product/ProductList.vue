<template>
  <div class="products-list">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import type { Product } from '@/types'

export default Vue.extend({
  name: 'ProductsList',

  props: {
    products: {
      type: Array as () => Product[],
      required: true,
    },
  },

  components: {
    ProductCard,
  },
})
</script>

<style scoped>
.products-list {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  gap: 20px;
}

@media (max-width: 1024px) {
  .products-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .products-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
}

@media (max-width: 480px) {
  .products-list {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-left: 24px;
  }
}
</style>
