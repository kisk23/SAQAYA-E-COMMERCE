<template>
  <div class="products-header">
    <h2 class="products-header__title" data-test="products-title">Explore Our Products</h2>

    <div class="products-header__controls">
      <label class="products-header__label" data-test="sort-label">Sort by</label>

      <div class="dropdown" ref="dropdown" @click.stop="toggle" data-test="dropdown">
        <div class="dropdown__selected" data-test="dropdown-selected">
          {{ selected }}
        </div>

        <ul v-if="open" class="dropdown__menu" data-test="dropdown-menu">
          <li
            v-for="option in options"
            :key="option"
            class="dropdown__item"
            :data-test="getTestId(option)"
            @click.stop="select(option)"
          >
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const selected = ref('Highest Rating')
const options = ['Highest Rating', 'Price: Low to High', 'Price: High to Low']
const dropdown = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  (e: 'change', option: string): void
}>()

const toggle = () => {
  open.value = !open.value
}

const getTestId = (option: string) => {
  const map: Record<string, string> = {
    'Highest Rating': 'dropdown-item-highest-rating',
    'Price: Low to High': 'dropdown-item-price--low-to-high',
    'Price: High to Low': 'dropdown-item-price--high-to-low',
  }
  return map[option]
}

const select = (option: string) => {
  selected.value = option
  open.value = false
  emit('change', option)
}

const handleClickOutside = (event: MouseEvent) => {
  if (!dropdown.value) return

  if (!dropdown.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
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
