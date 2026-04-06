<template>
  <section class="products">
    <div class="products__header">
      <h2 class="products__title">Explore Our Products</h2>

      <div class="products__controls">
        <label class="products__sort-label">Sort by</label>
        <select class="products__sort-select">
          <option>Highest Rating</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Discount percentage</option>
          <option>Brand</option>
          <option>Category</option>
        </select>
      </div>
    </div>
    <div class="products__items">
      <ProductCard v-for="product in products" :key="product.id" :product="product">
        <template #discount-badge />
      </ProductCard>
    </div>

    <div v-if="products.length === 0" class="products__empty">No products available</div>

    <div class="products__footer">
      <button class="products__load-more">Load more →</button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Product } from '@/types'
import ProductCard from '@/components/Home/ProductCard.vue'

export default Vue.extend({
  name: 'ProductsView',
  components: {
    ProductCard,
  },
  computed: {
    products(): Product[] {
      return this.$store.getters.products as Product[]
    },
  },
})
</script>

<style scoped>
.products {
  padding: 32px 24px;

  border-radius: 4px;
  background-color: #ffffff;
  font-family: sans-serif;
  max-width: 1170px;

  margin: 40px auto;
}

.products__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.products__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.products__items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.products__load-more {
  padding: 12px 48px;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
  margin: auto;
}
</style>
