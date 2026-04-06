<template>
  <aside class="cart-dropdown" aria-label="Shopping cart preview">
    <div class="cart-dropdown__header">
      <h3 class="cart-dropdown__title">Shopping Cart</h3>
      <span class="cart-dropdown__count"
        >{{ totalItems }} item{{ totalItems === 1 ? '' : 's' }}</span
      >
    </div>

    <div v-if="cartItems.length === 0" class="cart-dropdown__empty">Your cart is empty</div>

    <div v-else class="cart-dropdown__content">
      <div class="cart-dropdown__items">
        <div class="cart-dropdown__item" v-for="item in cartItems" :key="item.id">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="cart-dropdown__image" />
          <div v-else class="cart-dropdown__image cart-dropdown__image--placeholder">N/A</div>

          <div class="cart-dropdown__info">
            <p class="cart-dropdown__name">{{ item.title }}</p>
            <p class="cart-dropdown__meta">
              <span>Qty: {{ item.quantity }}</span>
              <span>${{ formatPrice(item.unitPrice) }} each</span>
            </p>
            <div class="cart-dropdown__controls">
              <button class="cart-dropdown__qty-btn" @click="decrease(item.id)">-</button>
              <span class="cart-dropdown__qty-value">{{ item.quantity }}</span>
              <button class="cart-dropdown__qty-btn" @click="increase(item.id)">+</button>
              <button class="cart-dropdown__remove-btn" @click="remove(item.id)">Remove</button>
            </div>
          </div>

          <p class="cart-dropdown__line-total">${{ formatPrice(item.lineTotal) }}</p>
        </div>
      </div>

      <div class="cart-dropdown__summary">
        <p class="cart-dropdown__summary-row">
          <span>Items</span>
          <strong>{{ totalItems }}</strong>
        </p>
        <p class="cart-dropdown__summary-row">
          <span>Total</span>
          <strong>${{ formatPrice(cartTotal) }}</strong>
        </p>
      </div>
    </div>

    <button v-if="cartItems.length > 0" class="cart-dropdown__checkout">Checkout</button>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue'
import type { NormalizedCartItem } from '@/types/cart'
export default Vue.extend({
  name: 'CartDropdown',

  computed: {
    // should we use a getter for this in the store instead ?
    // already done
    cartItems(): NormalizedCartItem[] {
      return this.$store.getters.cartItems
    },
    totalItems(): number {
      return this.$store.getters.totalItems
    },
    cartTotal() {
      return this.$store.getters.cartTotal
    },
  },
  methods: {
    increase(productId: number): void {
      this.$store.commit('incrementCartItem', productId)
    },
    decrease(productId: number): void {
      this.$store.commit('decreaseCartItem', productId)
    },
    remove(productId: number): void {
      this.$store.commit('removeFromCart', productId)
    },
    formatPrice(value: number): string {
      return value.toFixed(2)
    },
  },
})
</script>

<style scoped>
.cart-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 360px;
  background: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #ebebeb;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: all 0.25s ease;
}

.cart-dropdown::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;
}

.cart-dropdown__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 1px solid #efefef;
  padding-bottom: 8px;
}

.cart-dropdown__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}

.cart-dropdown__count {
  color: #6b7280;
  font-size: 12px;
}

.cart-dropdown__content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-dropdown__items {
  max-height: 280px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-dropdown__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ececec;
}

.cart-dropdown__image {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
  background: #f3f4f6;
}

.cart-dropdown__image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 11px;
}

.cart-dropdown__name {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
}

.cart-dropdown__meta {
  margin: 0;
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #6b7280;
}

.cart-dropdown__controls {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cart-dropdown__qty-btn {
  width: 24px;
  height: 24px;
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  line-height: 1;
}

.cart-dropdown__qty-value {
  min-width: 16px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
}

.cart-dropdown__remove-btn {
  margin-left: 6px;
  border: none;
  background: transparent;
  color: #dc2626;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.cart-dropdown__line-total {
  margin-left: auto;
  font-size: 12px;
  font-weight: 700;
  color: #111827;
}

.cart-dropdown__summary {
  border-top: 1px solid #efefef;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cart-dropdown__summary-row {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}

.cart-dropdown__empty {
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  padding: 12px 0;
}

.cart-dropdown__checkout {
  width: 100%;
  border: none;
  border-radius: 8px;
  background: #111827;
  color: #fff;
  font-weight: 600;
  padding: 10px 12px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .cart-dropdown {
    width: 320px;
    right: -12px;
  }
}
</style>
