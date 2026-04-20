<template>
  <div class="product-info">
    <h1 class="product-info__title">{{ product.title }}</h1>
    <div class="product-info__rating-row">
      <div class="product-info__stars">
        <span v-for="star in 5" :key="star" class="product-info__star" :class="getStarClass(star)"
          >★</span
        >
      </div>
      <span class="product-info__review-count">({{ product.reviews.length }} Reviews)</span>
      <span class="product-info__pipe">|</span>
      <span
        class="product-info__availability"
        :class="
          product.availabilityStatus === 'Low Stock'
            ? 'product-info__availability--low-stock'
            : 'product-info__availability--in-stock'
        "
      >
        {{ product.availabilityStatus }}
      </span>
    </div>
    <div class="product-info__price-row">
      <span class="product-info__price">${{ product.price.toFixed(2) }}</span>
      <span class="product-info__discount-badge"
        >-{{ Math.round(product.discountPercentage) }}%</span
      >
    </div>
    <p class="product-info__description">{{ product.description }}</p>
    <div class="product-info__divider-line"></div>
    <div class="product-info__category-row">
      <span class="product-info__category-label">Category:</span>
      <a href="#" class="product-info__category-link">{{ product.category }}</a>
    </div>
    <div class="product-info__divider-line"></div>
    <div class="product-info__actions">
      <div class="product-info__quantity">
        <button
          class="product-info__quantity-btn"
          :disabled="qty <= 1"
          aria-label="Decrease quantity"
          @click="decrement"
        >
          −
        </button>
        <span class="product-info__quantity-value">{{ qty }}</span>
        <button
          class="product-info__quantity-btn product-info__quantity-btn--colred"
          :disabled="qty >= product.stock"
          aria-label="Increase quantity"
          @click="increment"
        >
          +
        </button>
      </div>
      <button class="product-info__buy-btn" @click="$emit('buy-now', { product, qty })">
        Buy Now
      </button>
      <button
        class="product-info__wishlist-btn"
        :class="{ 'product-info__wishlist-btn--active': wishlisted }"
        aria-label="Add to wishlist"
        @click="wishlisted = !wishlisted"
      >
        <img src="@/assets/icons/wishlist.svg" alt="Wishlist" />
      </button>
    </div>

    <div class="product-info__delivery">
      <div class="product-info__delivery-card">
        <img src="@/assets/icons/car.svg" alt="" />
        <div class="product-info__delivery-info">
          <span class="product-info__delivery-title">Free Delivery</span>
          <span class="product-info__delivery-sub">
            <a href="#" class="product-info__delivery-link"
              >Enter your postal code for Delivery Availability</a
            >
          </span>
        </div>
      </div>
      <div class="product-info__delivery-card">
        <img src="@/assets/icons/return.svg" alt="" />
        <div class="product-info__delivery-info">
          <span class="product-info__delivery-title">Return Delivery</span>
          <span class="product-info__delivery-sub">
            Free 30 Days Delivery Returns.
            <a href="#" class="product-info__delivery-link">Details</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'buy-now', payload: { product: Product; qty: number }): void
}>()

const qty = ref(1)
const wishlisted = ref(false)

const getStarClass = (star: number) => {
  const r = props.product.rating
  return {
    'product-info__star--full': star <= Math.floor(r),
    'product-info__star--half': star === Math.ceil(r) && r % 1 >= 0.4,
    'product-info__star--empty': star > Math.ceil(r),
  }
}

const increment = () => {
  if (qty.value < props.product.stock) qty.value++
}

const decrement = () => {
  if (qty.value > 1) qty.value--
}
</script>

<style lang="scss" scoped>
.product-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a2e;
  max-width: 420px;
}
.product-info__title {
  font-family: 'Playfair Display', serif;
  color: #1a1a2e;
  margin: 0;
}
.product-info__rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.product-info__stars {
  display: flex;
  gap: 2px;
}
.product-info__star {
  color: #e0e0e0;
}
.product-info__star--full,
.product-info__star--half {
  color: #f5a623;
}
.product-info__review-count,
.product-info__category-label {
  color: #888;
}
.product-info__pipe {
  color: #ccc;
}
.product-info__availability--in-stock {
  color: #4caf82;
}
.product-info__availability--low-stock {
  color: #e07b39;
}
.product-info__price-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.product-info__price {
  color: #1a1a2e;
  letter-spacing: -0.5px;
}
.product-info__discount-badge {
  background: #e53935;
  color: #fff;
  padding: 3px 9px;
  border-radius: 5px;
}
.product-info__description {
  color: #555;
  margin: 0;
}
.product-info__divider-line {
  width: 100%;
  height: 1px;
  background: #ececec;
}
.product-info__category-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.product-info__category-link {
  color: #1a1a2e;
  text-decoration: none;
  border-bottom: 1.5px solid #c9a96e;
  padding-bottom: 1px;
}
.product-info__actions {
  display: flex;
  align-items: center;
  gap: 30px;
}
.product-info__quantity {
  display: flex;
  align-items: center;
  border: 1.5px solid #d0d0d0;
  border-radius: 8px;
  overflow: hidden;
}
.product-info__quantity-btn {
  width: 44px;
  height: 40px;
  border: none;
  background: transparent;
  color: #000062;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-info__quantity-value {
  width: 36px;
  text-align: center;
  color: #1a1a2e;
  border-left: 1.5px solid #d0d0d0;
  border-right: 1.5px solid #d0d0d0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.product-info__buy-btn {
  flex: 0.8;
  height: 40px;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
}
.product-info__quantity-btn--colred {
  background: #e53935;
  color: #fff;
}
.product-info__wishlist-btn {
  width: 40px;
  height: 40px;
  border: 1.5px solid #d0d0d0;
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  color: #aaa;
}
.product-info__wishlist-btn--active {
  border-color: #e53935;
  background: #fff5f5;
  color: #e53935;
}
.product-info__delivery {
  display: flex;
  flex-direction: column;
  border: 1.5px solid #ececec;
  border-radius: 12px;
  overflow: hidden;
}
.product-info__delivery-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: #fff;
}
.product-info__delivery-card + .product-info__delivery-card {
  border-top: 1.5px solid #ececec;
}
.product-info__delivery-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.product-info__delivery-title {
  color: #1a1a2e;
}
.product-info__delivery-sub {
  color: #888;
}
.product-info__delivery-link {
  color: #1a1a2e;
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
