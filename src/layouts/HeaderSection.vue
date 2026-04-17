<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <span class="header__brand">Exclusive</span>
      </div>

      <nav :class="['header__nav', { 'header__nav--open': isMenuOpen }]">
        <router-link class="header__link" to="/" @click.native="closeMenu">Home</router-link>
        <router-link class="header__link" to="/contact" @click.native="closeMenu"
          >Contact</router-link
        >
        <router-link class="header__link" to="/products" @click.native="closeMenu"
          >Products</router-link
        >
        <router-link class="header__link" to="/about" @click.native="closeMenu">About</router-link>
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
          <button class="header__cart" @click="toggleCart">
            <img src="@/assets/images/Cart1.png" alt="Cart" />
            <span class="header__badge">{{ cartCount }}</span>
          </button>

          <CartDrawer :isOpen="isCartOpen" @close="isCartOpen = false" />
        </div>
        <button class="header__hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'

export default Vue.extend({
  name: 'HeaderSection',
  components: { CartDrawer },
  data() {
    return {
      isCartOpen: false,
      isMenuOpen: false,
    }
  },

  computed: {
    cartCount(): number {
      return this.$store.getters['cart/totalItems']
    },
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    },
  },
})
</script>
<style lang="scss" scoped>
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
  position: relative;
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
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  padding: 1rem 1.5rem;
  display: none;
  flex-direction: column;
  gap: 1rem;
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
.header__hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.header__hamburger span {
  width: 20px;
  height: 2px;
  background: #111827;
}
.header__nav--open {
  display: flex;
  z-index: 2;
}

@media (min-width: 768px) {
  .header__hamburger {
    display: none;
  }

  .header__nav {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    display: flex !important;
    flex-direction: row;
    gap: 2rem;
    width: auto;
    background: transparent;
    padding: 0;
  }
}

@media (min-width: 1024px) {
  .header__search {
    display: flex;
  }
}
</style>
