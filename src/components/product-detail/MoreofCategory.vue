<template>
  <section class="category-section">
    <TodayBadge :label="categoryName || 'More of this category'" />

    <div class="category-section__list">
      <ProductCard v-for="product in products" :key="product.id" :product="product">
        <template #discount-badge>
          <span v-if="product.discountPercentage" class="product-card__discount">
            -{{ Math.round(product.discountPercentage) }}%
          </span>
        </template>
      </ProductCard>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import TodayBadge from '@/components/shared/TodayBadge.vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import { Product } from '@/types'

export default Vue.extend({
  name: 'MoreofCategory',

  components: {
    TodayBadge,
    ProductCard,
  },

  props: {
    category: {
      type: String,
      required: true,
    },
  },

  computed: {
    categoryName(): string {
      return this.category
    },

    products(): Product[] {
      const products = this.$store.getters['product/getByCategory'](this.category)
      return products.slice(0, 4)
    },
  },

  created() {
    this.$store.dispatch('product/fetchByCategory', this.category)
  },
})
</script>

<style scoped>
.category-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 100px 50px;
}

.category-section__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .category-section__list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .category-section__list {
    grid-template-columns: 1fr;
  }
}
</style>
