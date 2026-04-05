<template>
  <section>
    <HeroSection />
    <FlashSales />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import HeroSection from '@/components/Home/HeroSection.vue'
import FlashSales from '@/components/Home/FlashSales.vue'

export default Vue.extend({
  name: 'HomeView',
  components: {
    HeroSection,
    FlashSales,
  },
})
</script>
