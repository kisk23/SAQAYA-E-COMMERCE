<template>
  <section class="browse__categories">
    <TodayBadge label="Categories" class="categories__badge" />

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
import TodayBadge from '@/components/shared/TodayBadge.vue'

export default Vue.extend({
  name: 'BrowseCategory',
  data() {
    return {
      activeId: null,
    }
  },
  computed: {
    mappedCategories() {
      return this.$store.getters['category/mappedCategories']
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
})
</script>

<style scoped>
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
  max-width: 1100;
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
