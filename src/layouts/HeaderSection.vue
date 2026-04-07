<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <span class="header__brand">Exclusive</span>
      </div>

      <nav class="header__nav">
        <router-link class="header__link" to="/">Home</router-link>
        <router-link class="header__link" to="/contact">Contact</router-link>
        <router-link class="header__link" to="/about">About</router-link>
      </nav>

      <div class="header__actions">
        <div class="header__search">
          <input class="header__input" type="text" placeholder="What are you looking for?" />
          <button class="header__search-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>

        <div class="header__cart-wrapper">
          <button class="header__cart" @click="$emit('toggle-cart')">
            <img src="@/assets/images/Cart1.png" alt="Cart" />
            <span class="header__badge">{{ cartCount }}</span>
          </button>

          <CartDropdown />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import CartDropdown from '@/components/CartDropdown.vue'

export default Vue.extend({
  name: 'HeaderSection',
  components: { CartDropdown },
  props: {
    isCartOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  computed: {
    cartCount(): number {
      return this.$store.state.cart.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
      )
    },
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart')
    },
  },
})
</script>
<style scoped>
.header {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  margin-top: 48px;
}

.header__container {
  max-width: 1210px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header__logo {
  flex-shrink: 0;
}

.header__brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.header__nav {
  display: none;
  align-items: center;
  gap: 2rem;
  margin-left: 20%;
}

.header__link {
  font-size: 0.875rem;
  color: #374151;
  text-decoration: none;
  transition: color 0.2s ease;
}

.header__link:hover {
  color: #111827;
  text-decoration: underline;
}

.header__actions {
  height: 38px;
  min-height: 38px;
  max-height: 38px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  justify-content: flex-end;
}

.header__search {
  display: none;
  align-items: center;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
}

.header__input {
  background: transparent;
  font-size: 0.875rem;
  color: #374151;
  border: none;
  outline: none;
  width: 12rem;
}

.header__search-btn {
  background: none;
  border: none;
  color: #4b5563;
  cursor: pointer;
  margin-left: 0.5rem;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
}

.header__search-btn:hover {
  color: #111827;
}

.header__search-btn svg {
  width: 100%;
  height: 100%;
}

.header__cart {
  position: relative;
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
}

.header__badge {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header__cart-wrapper {
  position: relative;
  padding-bottom: 8px;
}

.header__cart-wrapper:hover .cart-dropdown,
.header__cart-wrapper .cart-dropdown:hover {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

@media (min-width: 768px) {
  .header__nav {
    display: flex;
  }
}

@media (min-width: 1024px) {
  .header__search {
    display: flex;
  }
}
</style>
