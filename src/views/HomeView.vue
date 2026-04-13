<template>
  <section>
    <HeroSection />
    <FlashSales />
    <BrowseCategory />
    <ExploreProducts />
    <FeaturesBar />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroSection from '@/components/home/HeroSection.vue'
import FlashSales from '@/components/home/FlashSales.vue'
import BrowseCategory from '@/components/home/BrowseCategory.vue'
import ExploreProducts from '@/components/home/ExploreProducts.vue'
import FeaturesBar from '@/components/shared/FeaturesBar.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    HeroSection,
    FlashSales,
    BrowseCategory,
    ExploreProducts,
    FeaturesBar,
  },
})
</script>
