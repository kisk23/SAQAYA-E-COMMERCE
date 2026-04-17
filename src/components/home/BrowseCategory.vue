<template>
  <section class="browse__categories">
    <TodayBadge label="Categories" class="categories__badge" />

    <h2 class="section-header__title">Browse by Category</h2>
    <p v-if="loading" class="categories__state">Loading categories...</p>

    <div v-else-if="mappedCategories.length" class="categories">
      <div
        v-for="category in mappedCategories"
        :key="category.id"
        class="categories__item"
        :class="{ 'categories__item--active': selectedCategory === category.id }"
        role="button"
        tabindex="0"
        @click="handleCategorySelect(category.id)"
        @keyup.enter="handleCategorySelect(category.id)"
      >
        <div class="categories__icon">
          <img :src="category.icon" :alt="category.name" />
        </div>
        <p class="categories__name">{{ category.name }}</p>
      </div>
    </div>

    <p v-else class="categories__state">No categories available.</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import TodayBadge from '@/components/shared/TodayBadge.vue'

interface MappedCategory {
  id: string
  name: string
  icon: string
}

export default Vue.extend({
  name: 'BrowseCategory',
  computed: {
    mappedCategories(): MappedCategory[] {
      return this.$store.getters['category/mappedCategories'] as MappedCategory[]
    },
    loading(): boolean {
      return this.$store.state.category.loading
    },
    selectedCategory(): string | null {
      return this.$store.getters['category/selectedCategory'] as string | null
    },
  },
  components: {
    TodayBadge,
  },
  created() {
    if (!this.$store.getters['category/categories'].length) {
      this.$store.dispatch('category/fetchCategories')
    }
  },
  methods: {
    handleCategorySelect(categoryId: string): void {
      this.$store.dispatch('category/setSelectedCategory', categoryId)
      this.$router
        .push({
          path: '/products',
          query: {
            category: categoryId,
            homePath: this.$route.fullPath,
            homeLabel: 'Home',
          },
        })
        .catch(() => undefined)
    },
  },
})
</script>

<style lang="scss" scoped>
.browse__categories {
  max-width: 1145px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 48px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 48px;
  max-width: 1100px;
}

.categories__state {
  margin-top: 24px;
  color: #6b7280;
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
  background: #db4444;
  color: #fff;
}

.categories__item--active {
  border-color: #999;
  background: #db4444;
  color: #fff;
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
.categories__badge {
  margin-left: 19px;
}
.section-header__title {
  font-size: 24px;
  font-weight: bold;
  margin-left: 10px;
}
</style>
