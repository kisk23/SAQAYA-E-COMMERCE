<template>
  <section>
    <HeroSection />
    <FlashSales />
    <BrowseByCategory />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroSection from '@/components/Home/HeroSection.vue'
import FlashSales from '@/components/Home/FlashSales.vue'
import BrowseByCategory from '@/components/Home/BrowseByCategory.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    HeroSection,
    FlashSales,
    BrowseByCategory,
  },
})
</script>
