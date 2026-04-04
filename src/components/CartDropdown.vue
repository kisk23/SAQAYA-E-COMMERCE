<template>
  <div class="cart-dropdown">
    <div v-if="cart.length === 0" class="cart-dropdown__empty">Cart is empty</div>

    <div v-else class="cart-dropdown__items">
      <div class="cart-dropdown__item" v-for="item in cart" :key="item.id">
        <img :src="item.image" class="cart-dropdown__image" />

        <div class="cart-dropdown__info">
          <p class="cart-dropdown__name">{{ item.name }}</p>
          <p class="cart-dropdown__price">${{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { Product } from '@/types'

export default Vue.extend({
  name: 'CartDropdown',

  computed: {
    cart(): Product[] {
      return this.$store.state.cart
    },
  },
})
</script>

<style scoped>
.cart-dropdown {
  position: absolute;
  top: 150%;
  right: 0;
  width: 300px;
  background: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 12px;

  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: all 0.25s ease;
}

.cart-dropdown__item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.cart-dropdown__image {
  width: 40px;
  height: 40px;
}

.cart-dropdown__name {
  font-size: 13px;
}

.cart-dropdown__price {
  font-size: 12px;
  color: #777;
}

.cart-dropdown__empty {
  text-align: center;
  font-size: 14px;
  color: #777;
}
</style>
