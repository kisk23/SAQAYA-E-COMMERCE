<template>
  <div class="product-card">
    <div class="product-card__image">
      <slot name="discount-badge"> </slot>

      <img :src="product.thumbnail" :alt="`Product image: ${product.title}`" />

      <div class="product-card__actions">
        <button @click="addToCart">Add to Cart</button>
      </div>
    </div>

    <div class="product-card__info">
      <p class="product-card__name">{{ product.title }}</p>

      <div class="product-card__prices">
        <span class="product-card__price"
          >${{ (product.price * (1 - product.discountPercentage / 100)).toFixed(2) }}</span
        >
        <span class="product-card__old">${{ product.price?.toFixed(2) }}</span>
      </div>
    </div>
    <div class="product-card__rating">
      <svg
        v-for="n in 5"
        :key="n"
        viewBox="0 0 16 16"
        class="product-card__star"
        :class="{ 'product-card__star--filled': n <= Math.round(averageRating) }"
      >
        <path
          d="M13.9464 6.83189C15.0171 6.022 14.4444 4.31533 13.1018 4.31533H10.6727C10.0587 4.31533 9.51645 3.91536 9.33512 3.32884L8.61098 0.98653C8.20433 -0.328787 6.34254 -0.328787 5.9359 0.98653L5.21175 3.32884C5.03042 3.91536 4.48813 4.31533 3.87421 4.31533H1.40305C0.0648563 4.31533 -0.510644 6.01289 0.551656 6.82669L2.66813 8.44808C3.13229 8.80365 3.32658 9.41024 3.1554 9.96932L2.3864 12.4809C1.9876 13.7834 3.49511 14.8305 4.57645 14.0021L6.42205 12.5882C6.92441 12.2034 7.62247 12.2034 8.12483 12.5882L9.95413 13.9896C11.037 14.8192 12.546 13.768 12.1431 12.4648L11.3634 9.94286C11.1894 9.37991 11.3864 8.76824 11.8564 8.41278L13.9464 6.83189Z"
        />
      </svg>
      <span class="product-card__reviews">({{ product.reviews.length }})</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import type { Product } from '@/types'
export default Vue.extend({
  props: {
    //this entire problem PropType<Product> disappears with defineProps.
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },

  computed: {
    averageRating(): number {
      const reviews = this.product.reviews || []

      if (!reviews.length) return 0

      const total = reviews.reduce((sum, r) => sum + r.rating, 0)
      return total / reviews.length
    },
  },
  methods: {
    addToCart() {
      this.$store.commit('addToCart', this.product)
    },
  },
})
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 280px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
}

.product-card__image {
  position: relative;
  background: #f5f5f5;
  text-align: center;
}

.product-card__discount {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #db4444;
  color: white;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 4px;
}

.product-card__image img {
  max-width: 100%;
}

.product-card__name {
  font-size: 14px;
  margin: 10px 0;
}

.product-card__prices {
  display: flex;
  gap: 8px;
}

.product-card__price {
  color: #db4444;
  font-weight: bold;
}

.product-card__old {
  text-decoration: line-through;
  color: gray;
}
.product-card__actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.product-card__actions button {
  position: relative;
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;

  box-sizing: border-box;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.product-card__image:hover .product-card__actions button {
  opacity: 1;
}
.product-card__rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 13px;
}

.product-card__star {
  width: 16px;
  height: 16px;
  fill: #ddd;
}

.product-card__star--filled {
  fill: #f5a623;
}
.product-card__rating {
  display: flex;
  align-items: center;
  gap: 6px;
}

.product-card__reviews {
  font-size: 13px;
  color: #888;
  margin-top: -4px;
}
</style>
