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
import HeroSection from '@/components/Home/HeroSection.vue'
import FlashSales from '@/components/Home/FlashSales.vue'
import BrowseCategory from '@/components/Home/BrowseCategory.vue'
import ExploreProducts from '@/components/Home/ExploreProducts.vue'
import FeaturesBar from '@/components/Home/FeaturesBar.vue'

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
