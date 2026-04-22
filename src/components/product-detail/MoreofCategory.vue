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

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import TodayBadge from '@/components/shared/TodayBadge.vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import { useProductStore } from '@/store/modules/product'

const props = defineProps<{
  category: string
}>()

const productStore = useProductStore()

const categoryName = computed(() => props.category)

const products = computed(() => {
  const result = productStore.getByCategory(props.category)
  return result.slice(0, 4)
})

onMounted(() => {
  productStore.fetchByCategory(props.category)
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
