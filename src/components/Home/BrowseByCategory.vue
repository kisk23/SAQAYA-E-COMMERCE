<template>
  <section class="browse__categories">
    <TodayBadge label="Categories" />

    <h2 class="section-header__title">Browse by Category</h2>
    <div class="categories">
      <div v-for="category in mappedCategories" :key="category.id" class="categories__item">
        <div class="categories__icon">
          <img :src="category.icon" :alt="category.name" />
        </div>
        <p class="categories__name">{{ category.name }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import TodayBadge from './TodayBadge.vue'

const categoryMap: Record<string, { label: string; icon: string }> = {
  beauty: {
    label: 'Beauty',
    icon: '/images/categories/beauty.svg',
  },
  furniture: {
    label: 'Furniture',
    icon: '/images/categories/furniture.svg',
  },
  fragrances: {
    label: 'Fragrance',
    icon: '/images/categories/fragrance.svg',
  },
  'mobile-accessories': {
    label: 'Mobile Accessories',
    icon: '/images/categories/mobile.svg',
  },
  'home-decoration': {
    label: 'Home Accessories',
    icon: '/images/categories/home.svg',
  },
}
export default Vue.extend({
  name: 'BrowseByCategory',
  data() {
    return {
      activeId: null as number | null, // The activeId is used to track which category is currently selected by the user to be added if wanted
    }
  },
  computed: {
    // This computed property maps the category names from the store to their
    // corresponding labels and icons defined in the categoryMap.
    //  It filters out any categories that don't have a mapping and returns an array
    mappedCategories() {
      return this.$store.state.categories
        .filter((cat: string) => categoryMap[cat])
        .map((cat: string, index: number) => ({
          id: index,
          name: categoryMap[cat].label,
          icon: categoryMap[cat].icon,
        }))
    },
  },
  components: {
    TodayBadge,
  },
  created() {
    if (!this.$store.state.categories.length) {
      this.$store.dispatch('fetchCategories')
    }
  },
})
</script>

<style scoped>
.browse__categories {
  max-width: 1148px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 84px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.categories__item {
  flex: 1 1 calc(16.66% - 20px);
  min-width: 140px;
  height: 120px;

  border: 1px solid #ddd;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s ease;
  background: #fff;
}

.categories__item:hover {
  border-color: #999;
}

.categories__item--active {
  background: #db4444;
  color: #fff;
  border-color: #db4444;
}

.categories__icon {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.categories__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.categories__name {
  font-size: 14px;
  text-align: center;
}
</style>
