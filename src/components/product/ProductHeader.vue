<template>
  <div class="products-header">
    <h2 class="products-header__title">Explore Our Products</h2>

    <div class="products-header__controls">
      <label class="products-header__label">Sort by</label>

      <div class="dropdown" ref="dropdown" @click.stop="toggle">
        <div class="dropdown__selected">
          {{ selected }}
        </div>

        <ul v-if="open" class="dropdown__menu">
          <li
            v-for="option in options"
            :key="option"
            class="dropdown__item"
            @click.stop="select(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      open: false,
      selected: 'Highest Rating',
      options: ['Highest Rating', 'Price: Low to High', 'Price: High to Low'],
    }
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
  },

  methods: {
    toggle() {
      this.open = !this.open
    },

    select(option: string) {
      this.selected = option
      this.open = false
      this.$emit('change', option)
    },

    handleClickOutside(event: MouseEvent) {
      const dropdown = this.$refs.dropdown as HTMLElement

      if (!dropdown) return

      if (!dropdown.contains(event.target as Node)) {
        this.open = false
      }
    },
  },
})
</script>

<style scoped>
.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.products-header__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
}

.products-header__controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.products-header__label {
  font-size: 0.9rem;
}

.products-header__select {
  padding: 6px 10px;
  max-width: 150px;
}

.dropdown {
  position: relative;
  width: 180px;
  cursor: pointer;
}

.dropdown__selected {
  background: #565656;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
}

.dropdown__menu {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: #423840;
  border-radius: 4px;
  overflow: hidden;

  z-index: 10;
}

.dropdown__item {
  padding: 10px 12px;
  color: #fff;
  transition: background 0.2s;
}

.dropdown__item:hover {
  background: #5a4f58;
}

@media (max-width: 768px) {
  .products-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .products-header__title {
    font-size: 1.2rem;
  }
  .products-header__controls {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
