<template>
  <div class="cart-drawer-wrapper">
    <div
      class="cart-drawer__backdrop"
      :class="{ 'cart-drawer__backdrop--active': isOpen }"
      @click="$emit('close')"
    />

    <aside
      class="cart-drawer"
      :class="{ 'cart-drawer--active': isOpen }"
      aria-label="Shopping cart"
      @click.stop
    >
      <div class="cart-drawer__header">
        <h3 class="cart-drawer__title">Shopping Cart</h3>
        <button class="cart-drawer__close" @click="$emit('close')">✕</button>
      </div>

      <div v-if="cartItems.length === 0" class="cart-drawer__empty">Your cart is empty</div>

      <div v-else class="cart-drawer__body">
        <div class="cart-drawer__items">
          <div class="cart-drawer__item" v-for="item in cartItems" :key="item.id">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="cart-drawer__image" />
            <div v-else class="cart-drawer__image cart-drawer__image--placeholder">N/A</div>

            <div class="cart-drawer__info">
              <p class="cart-drawer__name">{{ item.title }}</p>

              <div class="cart-drawer__controls">
                <button @click="decrease(item.id)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="increase(item.id)">+</button>
              </div>

              <button class="cart-drawer__remove" @click="remove(item.id)">Remove</button>
            </div>

            <p class="cart-drawer__price">
              {{ formatPrice(item.lineTotal) }}
            </p>
          </div>
        </div>

        <div class="cart-drawer__summary">
          <div class="cart-drawer__row">
            <span>Subtotal</span>
            <strong>{{ formatPrice(cartTotal) }}</strong>
          </div>
          <div class="cart-drawer__row">
            <span>Shipping</span>
            <strong>Free</strong>
          </div>
          <div class="cart-drawer__row cart-drawer__row--total">
            <span>Total</span>
            <strong>{{ formatPrice(cartTotal) }}</strong>
          </div>
        </div>

        <button class="cart-drawer__checkout">Place Order</button>
      </div>
    </aside>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { NormalizedCartItem } from '@/types/cart'
import { formatPrice } from '@/utils/format'
export default Vue.extend({
  name: 'CartDrawer',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    cartItems(): NormalizedCartItem[] {
      return this.$store.getters['cart/cartItems'] as NormalizedCartItem[]
    },
    totalItems(): number {
      return this.$store.getters['cart/totalItems']
    },
    cartTotal() {
      return this.$store.getters['cart/cartTotal']
    },
  },
  methods: {
    increase(productId: number): void {
      this.$store.commit('cart/incrementCartItem', productId)
    },
    decrease(productId: number): void {
      this.$store.commit('cart/decreaseCartItem', productId)
    },
    remove(productId: number): void {
      this.$store.commit('cart/removeFromCart', productId)
    },
    formatPrice,
  },
})
</script>

<style scoped>
.cart-drawer__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 999;
}
.cart-drawer__backdrop--active {
  opacity: 1;
  pointer-events: auto;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background: #fff;
  z-index: 1000;

  display: flex;
  flex-direction: column;

  transform: translateX(100%);
  transition: transform 0.3s ease;
}
.cart-drawer--active {
  transform: translateX(0);
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.cart-drawer__title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.cart-drawer__close {
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.cart-drawer__body {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
}

.cart-drawer__items {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-drawer__item {
  display: flex;
  gap: 12px;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}

.cart-drawer__image {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  background: #f3f4f6;
}

.cart-drawer__image--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.cart-drawer__info {
  flex: 1;
}

.cart-drawer__name {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
}

.cart-drawer__controls {
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 4px;
}

.cart-drawer__controls button {
  width: 26px;
  height: 26px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}

.cart-drawer__remove {
  border: none;
  background: transparent;
  color: #dc2626;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.cart-drawer__price {
  font-weight: 600;
  font-size: 14px;
}

.cart-drawer__summary {
  border-top: 1px solid #eee;
  padding-top: 12px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-drawer__row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.cart-drawer__row--total {
  font-weight: 700;
}

.cart-drawer__empty {
  text-align: center;
  padding: 40px 0;
  color: #777;
}

.cart-drawer__checkout {
  margin-top: 16px;
  border: none;
  background: #dc2626;
  color: #fff;
  padding: 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

@media (max-width: 768px) {
  .cart-drawer {
    width: 100%;
  }
}
</style>
